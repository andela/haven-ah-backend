import bookmarkRepo from '../repository/bookmarkRepository';
import { goodHttpResponse } from '../utilities/httpResponse';
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
}

export default Bookmark;
