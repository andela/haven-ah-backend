import slug from 'slug';
import articleRepo from '../repository/articleRepository';
import { goodHttpResponse, badHttpResponse } from '../utilities/httpResponse';
/**
 * Article Controller class
 */
class Article {
  /**
   * Create a new article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async createArticle(request, response) {
    const {
      title,
      body,
      description,
      images,
    } = request.body;
    const readtime = Math.floor(body.split(' ').length / 3);
    try {
      const newArticle = await articleRepo.createArticle({
        slug: slug(`${title} ${Date.now()}`),
        title,
        body,
        userid: request.userId,
        description,
        readtime,
        images: images.split(','),
      });
      return goodHttpResponse(response, 201, 'Article Created', newArticle);
    } catch (error) {
      return badHttpResponse(response, 500, 'There was an internal error', error);
    }
  }
}

export default Article;
