import Model from '../models';
import getPaginationMeta from '../utilities/getPaginationMeta';

const { Articles } = Model;

/**
 * Article repository class
 */
class ArticleRepository {
  /**
   * Function to create an article in the database
   * @param {object} article object
   * @returns {object} article object
   ** otherwise it throws an error
   */
  static async createArticle(article) {
    try {
      return await Articles.create(article);
    } catch (error) {
      return error;
    }
  }

  /**
   *Function to delete an article from the database
   *
   * @param {object} article
   * @returns {Object | null} User object or null
   */
  static async deleteArticle(article) {
    const articleRecord = await Articles.find({
      where: {
        slug: article.slug,
      }
    });
    if (!articleRecord) {
      return null;
    }
    await articleRecord.destroy();
  }

  /**
   * Function to get all article in the database
   * @param { integer } limit
   * @param { integer } page
   * @returns { object | null }
   ** otherwise it throws an error
   */
  static async getArticles(limit = 10, page = 1) {
    const offset = limit * (page - 1);
    const articleRecords = await Articles.findAndCountAll({
      limit,
      offset
    });
    articleRecords.meta = getPaginationMeta(limit, page, articleRecords.count);
    return articleRecords;
  }

  /**
   * Function to get a single article
   * @param { string } slug
   * @returns { object }
   ** otherwise it throws an error
   */
  static async getArticleBySlug(slug) {
    const singleArticle = await Articles.findOne({
      where: {
        slug
      }
    });
    if (!singleArticle) {
      return null;
    }
    return singleArticle;
  }
}

export default ArticleRepository;
