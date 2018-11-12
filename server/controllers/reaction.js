import reactionRepo from '../repository/reactionRepository';
import notificationRepo from '../repository/notificationRepository';
import { goodHttpResponse } from '../utilities/httpResponse';
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

    const newReaction = await reactionRepo.createReaction(article.id,
      request.userId, reactionType);
    notificationRepo.createNotification({
      type: 'NEW_REACTION_UPDATE',
      userId: newReaction.userId,
      articleId: newReaction.articleId,
      content: 'A new reaction has been made by someone you follow.'
    });

    return goodHttpResponse(
      response,
      201,
      message,
    );
  }
}

export default Reaction;
