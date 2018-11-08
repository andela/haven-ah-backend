import Model from '../models';

const { Comment, CommentHistory } = Model;

/**
 * Comment repository class
 */
class CommentRepository {
  /**
   * Function to create a comment in the database
   * @param {object} comment object
   * @returns {object} comment object
   * otherwise it throws an error
   */
  static async createComment(comment) {
    const newComment = await Comment.create(comment);
    return newComment;
  }

  /**
   * Function to get a comment from the database
   * @param {object} id number
   * @returns {object} comment object
   * otherwise it throws an error
   */
  static async getComment(id) {
    const commentRecord = await Comment.findOne({
      where: {
        id,
      },
      include: ['Replies'],
    });
    if (!commentRecord) {
      return null;
    }
    return commentRecord;
  }

  /**
   * Method to create a comment History entry in the database
   * @param {object} comment object
   * @returns {object} comment object
   * otherwise it throws an error
   */
  static async createCommentHistory(comment) {
    const result = await CommentHistory.create(comment);
    return result.dataValues;
  }

  /**
   * Method to update a comment in the database
   * @param {object} newData contains body
   * @param {object} id number
   * @returns {object} comment object
   * otherwise it throws an error
   */
  static async updateComment(newData, id) {
    const updated = await Comment.update(newData, {
      returning: true,
      where: {
        id,
      },
    });
    return updated[1][0].dataValues;
  }
}

export default CommentRepository;
