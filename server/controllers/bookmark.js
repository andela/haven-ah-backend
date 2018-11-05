import articleRepo from '../repository/articleRepository';
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
    const { slug } = request.params;
    const { userId } = request;
    const findArticle = await articleRepo.getArticleBySlug(slug);
    if (!findArticle) {
      return badHttpResponse(response, 404, 'article not found');
    }
    const bookmarked = await bookmarkRepo.createBookmark(userId, findArticle.id);
    return goodHttpResponse(response, 201, 'article successfully bookmarked', bookmarked);
  }
}

export default Bookmark;
