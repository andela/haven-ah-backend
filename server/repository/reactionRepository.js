import Model from '../models';

const { Reaction } = Model;

/**
 * Article repository class
 */
class ReactionRepository {
  /**
     * Function to like an article in the database
     * @param { string } column
     * @param { integer } id
     * @param {integer} userId
     * @param {enum} reactionType
     * @returns {object}
     ** otherwise it throws an error
     */
  static async createReaction(column, id, userId, reactionType) {
    const reaction = await Reaction.create({
      reactionType,
      [column]: id,
      userId
    });
    return reaction;
  }

  /**
     * Function to remove an action
     * @param {string} column
     * @param {integer} id
     * @param { integer } userId
     * @returns {integer} article
     ** otherwise it throws an error
     */
  static async removeReaction(column, id, userId) {
    const removedReaction = await Reaction.destroy({
      where: {
        [column]: id,
        userId
      }
    });
    return removedReaction;
  }

  /**
     * Function to get a action
     * @param {column} column
     * @param {integer} id
     * @param { integer } userId
     * @returns {integer} article
     ** otherwise it throws an error
     */
  static async getReaction(column, id, userId) {
    const findReaction = await Reaction.findOne({
      where: {
        [column]: id,
        userId
      }
    });
    return findReaction;
  }

  /**
     * Function to update a action
     * @param {string} column
     * @param {integer} id
     * @param { integer } userId
     * @param { enum } reactionType
     * @returns {integer} article
     ** otherwise it throws an error
     */
  static async updateReaction(column, id, userId, reactionType) {
    const updatedReaction = await Reaction.update(
      {
        reactionType
      },
      {
        where: {
          [column]: id,
          userId
        }
      },
    );
    return updatedReaction;
  }
}

export default ReactionRepository;
