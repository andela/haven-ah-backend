import commentRepo from '../repository/commentRepository';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';
import articleRepo from '../repository/articleRepository';
import notificationRepo from '../repository/notificationRepository';

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
    if (!comment) {
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
}

export default Comment;
