import Model from '../models';

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
}

export default ArticleRepository;
