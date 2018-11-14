import reactionRepo from '../repository/reactionRepository';
import notificationRepo from '../repository/notificationRepository';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';
import { LIKE, LOVE } from '../utilities/reactionConstant';
import commentRepo from '../repository/commentRepository';

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

    if (reactionType === LIKE) {
      message = 'You liked this article';
    }
    if (reactionType === LOVE) {
      message = 'You loved this article';
    }

    const existingReaction = await reactionRepo.getReaction('articleId', article.id, userId);

    if (existingReaction && existingReaction.reactionType !== reactionType) {
      await reactionRepo
        .updateReaction('articleId', article.id, userId, reactionType);
      return goodHttpResponse(
        response,
        200,
        message,
      );
    }

    if (existingReaction) {
      await reactionRepo.removeReaction('articleId', article.id, userId);
      return goodHttpResponse(
        response,
        200,
        'You have removed your reaction',
      );
    }

    const newReaction = await reactionRepo.createReaction(
      'articleId',
      article.id,
      request.userId,
      reactionType
    );
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


  /**
   * Like Comment
   *  @param {object} request request objject
   * @param {object} response response object
   * @returns {object}  Reaction object
   */
  static async likeComment(request, response) {
    const { userId, article } = request;
    const { id } = request.params;
    const { reactionType } = request.body;
    let message;

    if (reactionType === LIKE) {
      message = 'You liked this comment';
    }
    if (reactionType === LOVE) {
      message = 'You loved this comment';
    }
    const findComment = await commentRepo.getComment(parseInt(id, 10));
    if (!findComment) {
      return badHttpResponse(
        response,
        404,
        'comment not found',
      );
    }

    if (findComment.articleId !== article.id) {
      return badHttpResponse(
        response,
        404,
        'comment does not belong to article',
      );
    }
    const existingReaction = await reactionRepo.getReaction('commentId', findComment.id, userId);
    if (existingReaction && existingReaction.reactionType !== reactionType) {
      await reactionRepo
        .updateReaction('commentId', findComment.id, userId, reactionType);
      return goodHttpResponse(
        response,
        200,
        message,
      );
    }
    if (existingReaction) {
      await reactionRepo.removeReaction('commentId', findComment.id, userId);
      return goodHttpResponse(
        response,
        200,
        'You have removed your reaction',
      );
    }
    const newReaction = await reactionRepo.createReaction(
      'commentId',
      findComment.id,
      request.userId,
      reactionType
    );
    notificationRepo.createNotification({
      type: 'NEW_REACTION_UPDATE',
      userId: newReaction.userId,
      commentId: newReaction.commentId,
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
