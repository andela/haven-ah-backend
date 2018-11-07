import Model from '../models';

const { Bookmark } = Model;
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
}

export default BookmarkRepository;
