import commentRepo from '../repository/commentRepository';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';
import articleRepo from '../repository/articleRepository';
import notificationRepo from '../repository/notificationRepository';
import addReplies from '../utilities/addReplies';

/**
 * Comment Controller class
 */
class Comment {
  /** Create a new comment
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Comment Object
   */
  static async createComment(request, response) {
    const { article } = request;

    request.body.articleId = article.id;
    const newComment = await commentRepo.createComment(request.body);
    return goodHttpResponse(response, 201, 'Comment created', newComment);
  }

  /**
   * Create a new reply
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Comment Object
   */
  static async createReply(request, response) {
    const { parentId } = request.params;
    const { body } = request.body;
    const { userId, article } = request;

    const articleId = article.id;
    const comment = await commentRepo.getComment(parentId);
    if (!comment || comment.isDeleted) {
      return badHttpResponse(response, 404, `We could not find the parent comment with id: ${parentId}`);
    }

    const replyBody = {
      body,
      userId,
      parentId,
      articleId,
    };
    const newReply = await commentRepo.createComment(replyBody);
    notificationRepo.createNotification({
      type: 'NEW_COMMENT_UPDATE',
      userId: newReply.userId,
      articleId: newReply.articleId,
      content: 'A new comment has been created.'
    });
    return goodHttpResponse(response, 201, 'Reply created', newReply);
  }

  /** Update a comment and create a new history entry
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Comment Object
   */
  static async updateComment(request, response) {
    if (!request.isAuthorized) {
      return badHttpResponse(
        response,
        401,
        'You are not permitted to complete this action',
      );
    }

    const { slug, id } = request.params;

    const article = await articleRepo.getArticleBySlug(slug);
    if (article === null) {
      return badHttpResponse(response, 404, 'We could not find this article');
    }
    request.body.articleId = article.id;

    const { oldComment } = request.body;
    await commentRepo.createCommentHistory(
      {
        commentId: id,
        oldComment,
      },
    );
    const newBody = {
      body: request.body.body,
    };
    const updatedComment = await commentRepo.updateComment(newBody, id);
    return goodHttpResponse(response, 200, 'Comment updated', updatedComment);
  }

  /**
   * Get comment with the comment History
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Comment Object
   */
  static async getCommentWithHistory(request, response) {
    if (!request.isAuthorized) {
      return badHttpResponse(
        response,
        401,
        'You are not permitted to complete this action',
      );
    }

    const { slug, id } = request.params;

    const article = await articleRepo.getArticleBySlug(slug);
    if (article === null) {
      return badHttpResponse(response, 404, 'We could not find this article');
    }

    const comment = await commentRepo.getCommentWithHistory(id);
    if (comment.editHistory.length <= 0) {
      comment.dataValues.editHistory = 'No edit history to show';
      return goodHttpResponse(response, 200, 'Comment found', comment);
    }

    return goodHttpResponse(response, 200, 'Comment and edit history found', comment);
  }

  /**
   * Get comments with the replies
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Comment Object
   */
  static async getComments(request, response) {
    const limit = parseInt(request.query.limit, 10) || 30;
    const page = parseInt(request.query.page, 10) || 1;

    const rawComments = await commentRepo.getCommentsOnArticle(request.article.id, limit, page);
    const maxParentId = Math.max(...rawComments.map(element => element.parentId));
    const data = [];
    for (let i = maxParentId; i >= 0; i -= 1) {
      const comment = addReplies(rawComments, i);
      data.push(comment);
    }
    const comments = data[data.length - 1];
    if (comments) {
      comments.push(rawComments.meta);
      return goodHttpResponse(response, 200, 'Comments found', comments);
    }
    return badHttpResponse(response, 200, 'No comments on this article yet');
  }

  /**
   * Delete a comment
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Deleted comment if operation was successful
   * or error object if operation was not successful
   */
  static async deleteComment(request, response) {
    const { role, userId, article } = request;
    const id = parseInt(request.params.id, 10);

    const comment = await commentRepo.getOnlyComment(id);

    if (!comment || comment.isDeleted) {
      return badHttpResponse(
        response,
        404,
        'This comment was not found.'
      );
    }

    if (comment.articleId !== article.id) {
      return badHttpResponse(
        response,
        400,
        'Sorry, this comment is being accessed wrongly.'
      );
    }

    if (role === 'user' && userId !== comment.userId) {
      return badHttpResponse(
        response,
        403,
        'Sorry, you can not perform this operation.'
      );
    }

    await commentRepo.deleteComment(comment);
    return goodHttpResponse(
      response,
      200,
      'Successfully deleted comment.',
    );
  }
}

export default Comment;
