import reactionRepo from '../repository/reactionRepository';
import articleRepo from '../repository/articleRepository';
import { goodHttpResponse, badHttpResponse, } from '../utilities/httpResponse';
import { LIKE, DISLIKE, LOVE } from '../utilities/reactionConstant';

/**
 * Reaction Controller class
 */
class Reaction {
  /**
   * Like Article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async postReaction(request, response) {
    const { slug } = request.params;
    const { userId, article } = request;
    const { reactionType } = request.body;

    let message;
    switch (reactionType) {
      case LIKE:
        message = 'You liked this article';
        break;
      case DISLIKE:
        message = 'You disliked this article';
        break;
      case LOVE:
        message = 'You loved this article';
        break;
      default:
        message = '';
    }

    const existingReaction = await reactionRepo.getReaction(article.id, userId);

    if (existingReaction && existingReaction.reactionType !== reactionType) {
      await reactionRepo
        .updateReaction(article.id, userId, reactionType);
      return goodHttpResponse(
        response,
        200,
        message,
      );
    }

    if (existingReaction) {
      await reactionRepo.removeReaction(article.id, userId);
      return goodHttpResponse(
        response,
        200,
        'You have removed your reaction',
      );
    }

    await reactionRepo.createReaction(article.id,
      request.userId, reactionType);
    return goodHttpResponse(
      response,
      201,
      message,
    );
  }
}

export default Reaction;
