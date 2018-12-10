import Model from '../models';
import getPaginationMeta from '../utilities/getPaginationMeta';

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
   * otherwise it returns null
   */
  static async getComment(id) {
    const commentRecord = await Comment.findOne({
      where: {
        id,
      },
      include: ['Replies'],
    });
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
    newData.hasBeenEdited = true;
    console.log(newData);
    const updated = await Comment.update(newData, {
      returning: true,
      where: {
        id,
      },
    });
    return updated[1][0].dataValues;
  }

  /**
   * Function to get a comment with the edit history from the database
   * @param {object} id number
   * @returns {object} comment object
   * otherwise it throws an error
   */
  static async getCommentWithHistory(id) {
    const commentRecord = await Comment.findOne({
      where: {
        id,
      },
      include: [{
        model: CommentHistory,
        as: 'editHistory',
      }],
      order: [
        [
          {
            model: CommentHistory, as: 'editHistory'
          }, 'createdAt', 'DESC'
        ],
      ],
    });
    return commentRecord;
  }

  /**
   * Function to get comments on an article
   * @param {number} userId user id
   * @param {number} articleId  article id
   * @param { integer } limit
   * @param { integer } page
   * @returns {object} comments object
   * otherwise it throws an error
   */
  static async getCommentsOnArticle(userId, articleId, limit = 30, page = 1) {
    const offset = limit * (page - 1);
    const data = await Comment.findAndCountAll({
      where: {
        articleId,
      },
    });
    const { count } = data;
    const commentRecords = await Comment.findAll({
      where: {
        articleId,
      },
      limit,
      offset,
      include: [
        {
          association: 'User',
          attributes: ['id', 'firstName', 'lastName', 'username', 'imageUrl']
        },
        {
          association: 'Reactions',
          attributes: ['id', 'reactionType', 'userId']
        }
      ],
    });

    const comments = commentRecords.map((comment) => {
      const reactions = {};
      const { Reactions } = comment.dataValues;
      if (userId) {
        let currentUserReaction = false;
        const reaction = Reactions.find(r => r.userId === userId);
        if (reaction) {
          currentUserReaction = reaction.reactionType;
        }
        reactions.currentUserReaction = currentUserReaction;
      }
      reactions.likes = Reactions.filter(r => r.reactionType === 'Like').length;
      reactions.loves = Reactions.filter(r => r.reactionType === 'Love').length;

      comment.dataValues.Reactions = reactions;
      return comment.dataValues;
    });
    const meta = getPaginationMeta(limit, page, count);
    return { comments, meta };
  }

  /**
    * Function to get a comment from the database
   * @param {object} id number
   * @returns {object} comment object
   * otherwise it returns null
   */
  static async getOnlyComment(id) {
    const comment = await Comment.findOne({
      where: {
        id,
      },
    });

    if (!comment) {
      return null;
    }
    return comment;
  }

  /**
   * Marks a comment as deleted
   * @param {number} comment Comment object
   * @returns {object} something
   */
  static async deleteComment(comment) {
    const deletedComment = await comment.update(
      {
        isDeleted: true,
      },
      {
        returning: true
      }
    );

    return deletedComment;
  }
}

export default CommentRepository;
