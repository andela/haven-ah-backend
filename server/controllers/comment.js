import commentRepo from '../repository/commentRepository';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';
import articleRepo from '../repository/articleRepository';

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
    const { slug } = request.params;

    const article = await articleRepo.getArticleBySlug(slug);
    if (article === null) {
      return badHttpResponse(response, 404, 'We could not find this article');
    }

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
    return goodHttpResponse(response, 201, 'Reply created', newReply);
  }
}

export default Comment;
