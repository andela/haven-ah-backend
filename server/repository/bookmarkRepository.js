import Model from '../models';

const { Bookmark, Articles, User } = Model;
/**
 * Bookmark Repository class
 */
class BookmarkRepository {
  /**
   * Function to bookmark article in the database
   * @param { integer } userId
   * @param { integer } articleId
   * @returns {object} bookmark object
   ** otherwise it throws an error
   */
  static async createBookmark(userId, articleId) {
    const bookmark = await Bookmark.findOrCreate({
      where: {
        userId,
        articleId
      }
    });
    return bookmark;
  }

  /**
   * Function to get bookmarked article by a user
   * @param { integer } userId
   * @returns {object} bookmark object
   ** otherwise it throws an error
   */
  static async getBookmarkedArticles(userId) {
    const bookmarkedArticles = await Bookmark.findAndCountAll({
      where: { userId },
      attributes: ['id'],
      include: [
        {
          model: User,
          where: userId,
          attributes: ['id', 'username', 'firstName', 'lastName', 'imageUrl'],
        },
        {
          model: Articles,
          where: Articles.Id,
          attributes: ['id', 'title', 'images', 'description', 'readtime', 'slug', 'createdAt', 'updatedAt']
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return {
      count: bookmarkedArticles.count,
      bookmarks: bookmarkedArticles.rows,
    };
  }

  /**
   * Function to find a bookmark to article with the id
   * @param { integer } articleId
   * @returns {object} bookmark object
   ** otherwise it throws an error
   */
  static async findBookmark(articleId) {
    const bookmark = await Bookmark.findOne({
      where: {
        articleId
      }
    });
    return bookmark;
  }

  /**
   * Function to find a bookmark to article with the id
  * @param { integer } articleId
   * @param { integer } userId
   * @returns {object} bookmark object
   ** otherwise it throws an error
   */
  static async deleteBookmark(articleId, userId) {
    const unbookmark = await Bookmark.destroy({
      where: {
        articleId,
        userId,
      }
    });
    return unbookmark;
  }
}

export default BookmarkRepository;
