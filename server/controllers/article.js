import slug from 'slug';
import articleRepo from '../repository/articleRepository';
import { goodHttpResponse, badHttpResponse, paginatedHttpResponse } from '../utilities/httpResponse';
import tagRepo from '../repository/tagRepository';

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
        images: images ? images.split(',') : [],
      });
      if (request.body.tags) {
        const combinedTags = request.body.tags.toLowerCase();
        const tagPromises = await tagRepo.processTags(
          combinedTags,
          newArticle.id
        );
        await Promise.all(tagPromises)
          .then(() => goodHttpResponse(
            response,
            201,
            'Article Created and Tags associated',
            { newArticle, combinedTags }
          ));
      } else {
        return goodHttpResponse(response, 201, 'Article Created', newArticle);
      }
    } catch (error) {
      return badHttpResponse(response, 500, 'There was an internal error', error);
    }
  }

  /**
   * Get all articles
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async getArticles(request, response) {
    try {
      const limit = parseInt(request.query.limit, 10) || 10;
      const page = parseInt(request.query.page, 10) || 1;

      const articles = await articleRepo.getArticles(limit, page);
      if (!articles) {
        return goodHttpResponse(response, 200, 'no articles found');
      }
      return paginatedHttpResponse(response, 200, 'all articles', articles);
    } catch (error) {
      return badHttpResponse(response, 500, 'There was an internal server error', error);
    }
  }
}

export default Article;
