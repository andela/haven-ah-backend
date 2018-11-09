import Model from '../models';

const { Reaction } = Model;

/**
 * Article repository class
 */
class ReactionRepository {
  /**
     * Function to like an article in the database
     * @param {integer} articleId
     * @param { integer } userId
     * @param { integer } reactionType
     * @returns {integer} article
     ** otherwise it throws an error
     */
  static async createReaction(articleId, userId, reactionType) {
    const reaction = await Reaction.create({
      reactionType,
      articleId,
      userId
    });
    return reaction;
  }

  /**
     * Function to remove an action
     * @param {integer} articleId
     * @param { integer } userId
     * @returns {integer} article
     ** otherwise it throws an error
     */
  static async removeReaction(articleId, userId) {
    const removedReaction = await Reaction.destroy({
      where: {
        articleId,
        userId
      }
    });
    return removedReaction;
  }

  /**
     * Function to get a action
     * @param {integer} articleId
     * @param { integer } userId
     * @returns {integer} article
     ** otherwise it throws an error
     */
  static async getReaction(articleId, userId) {
    const findReaction = await Reaction.findOne({
      where: {
        articleId,
        userId
      }
    });
    return findReaction;
  }

  /**
     * Function to update a action
     * @param {integer} articleId
     * @param { integer } userId
     * @param { enum } reactionType
     * @returns {integer} article
     ** otherwise it throws an error
     */
  static async updateReaction(articleId, userId, reactionType) {
    const updatedReaction = await Reaction.update(
      {
        reactionType
      },
      {
        where: {
          articleId,
          userId
        }
      },
    );
    return updatedReaction;
  }
}

export default ReactionRepository;
