import Model from '../models';

const { Comment } = Model;

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
    try {
      return await Comment.create(comment);
    } catch (error) {
      return error;
    }
  }

  /**
   * Function to create a comment in the database
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
}

export default CommentRepository;
