import bookmarkRepo from '../repository/bookmarkRepository';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';
/**
 * Bookmark Controller class
 */
class Bookmark {
  /**
   * bookmark an article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async bookmarkArticle(request, response) {
    const { userId, article } = request;

    const bookmarked = await bookmarkRepo.createBookmark(userId, article.id);
    return goodHttpResponse(response, 201, 'article successfully bookmarked', bookmarked);
  }

  /**
   * Get all user bookmarked articles
   * un-bookmark an article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async getBookmarkedArticles(request, response) {
    const { userId } = request;

    const foundArticles = await bookmarkRepo.getBookmarkedArticles(userId);
    if (!foundArticles.count) {
      return badHttpResponse(
        response,
        404,
        'No bookmarked Article found',
      );
    }
    return goodHttpResponse(
      response,
      200,
      'Bookmarked Articles retrieved',
      foundArticles
    );
  }

  /**
   * un-bookmark an article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async unbookmarkArticle(request, response) {
    const { id } = request.params;

    const unbookmarked = await bookmarkRepo.deleteBookmark(id);
    return goodHttpResponse(response, 202, 'bookmark successfully removed', { unbookmarked });
  }
}

export default Bookmark;
