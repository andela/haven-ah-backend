import Model from '../models';
import getPaginationMeta from '../utilities/getPaginationMeta';

const { Articles, Complaint } = Model;

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
    const newArticle = await Articles.create(article);
    return newArticle;
  }

  /**
   *Function to delete an article from the database
   *
   * @param {object} article
   * @returns {Object | null} User object or null
   */
  static async deleteArticle(article) {
    const articleRecord = await this.getArticleBySlug(article.slug);
    if (!articleRecord) {
      return null;
    }
    await articleRecord.update({
      isDeleted: true
    });
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
  * Finds an article by slug supplied
  * @param {string} slug Slug value
  * @returns {object | null} Article object or null if article is not found
  */
  static async getArticleBySlug(slug) {
    const article = await Articles.findOne({
      where: { slug }
    });

    if (!article) {
      return null;
    }
    return article;
  }

  /**
 * Function to get all article in the database
 * @param { integer } complaint Complaint object to create
 * @returns { object } New complaint
 */
  static async createArticleComplaint(complaint) {
    const {
      id,
      articleId,
      userId,
      complaintBody,
      complaintType,
    } = await Complaint.create(complaint);

    return {
      id,
      articleId,
      userId,
      complaintBody,
      complaintType,
    };
  }

  /**
   * Find an article by the slug and include user information
   * @param {string} slug Article slug to search by
   * @returns {object} Article or null if article is not found
   */
  static async getSingleArticle(slug) {
    const article = await Articles.findOne({
      where: { slug },
      include: [{
        association: 'Author',
        attributes: ['id', 'firstName', 'lastName', 'username', 'imageUrl', 'bio']
      }],
      attributes: {
        exclude: ['userid']
      }
    });

    if (!article) {
      return null;
    }
    return article;
  }
}

export default ArticleRepository;
