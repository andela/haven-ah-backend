import slug from 'slug';
import articleRepo from '../repository/articleRepository';
import { goodHttpResponse, badHttpResponse, paginatedHttpResponse } from '../utilities/httpResponse';
import tagRepo from '../repository/tagRepository';
import ratingRepo from '../repository/ratingRepository';
import reactionRepo from '../repository/reactionRepository';
import notificationRepo from '../repository/notificationRepository';
import rankArticles from '../utilities/articlesRanker';
import removeArrayDuplicates from '../utilities/removeArrayDuplicates';

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

    const newArticle = await articleRepo.createArticle({
      slug: slug(`${title} ${Date.now()}`),
      title,
      body,
      userid: request.userId,
      description,
      readtime,
      images: images ? images.split(',') : [],
    });

    notificationRepo.createNotification({
      type: 'NEW_ARTICLE_UPDATE',
      userId: newArticle.userid,
      articleId: newArticle.id,
      content: 'A new article has been posted by someone you follow.'
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
  }

  /**
   * Get a single article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Article object or error object if article is not found
   */
  static async getArticle(request, response) {
    const articleSlug = request.params.slug;
    const { userId } = request;
    const article = await articleRepo.getSingleArticle(articleSlug);
    if (!article) {
      return badHttpResponse(
        response,
        404,
        'This article was not found',
      );
    }

    if (userId && userId !== article.userid) {
      await articleRepo.addReadingStat(userId, article.id);
    }

    return goodHttpResponse(
      response,
      200,
      'Article retrieved',
      article,
    );
  }

  /**
   * Get all articles
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async getArticles(request, response) {
    const limit = parseInt(request.query.limit, 10) || 10;
    const page = parseInt(request.query.page, 10) || 1;

    const articles = await articleRepo.getArticles(limit, page);
    if (!articles || articles.rows.length <= 0) {
      return goodHttpResponse(response, 200, 'no articles found');
    }
    return paginatedHttpResponse(response, 200, 'all articles', articles);
  }

  /**
   * Post a complaint on an article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Error object if request was not successful
   * or posted complaint object if successful
   */
  static async postComplaint(request, response) {
    const { userId, article } = request;
    const { complaintBody, complaintType } = request.body;

    if (article.userid === userId) {
      return badHttpResponse(
        response,
        400,
        'Sorry, you can not raise a complaint against your article.',
      );
    }
    const complaint = await articleRepo.createArticleComplaint({
      userId,
      complaintBody,
      complaintType,
      articleId: article.id,
    });

    return goodHttpResponse(
      response,
      201,
      'You have logged a complaint on this article.',
      complaint,
    );
  }

  /**
   * Rate an article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} rating
   */
  static async rateArticle(request, response) {
    const { article, userId } = request;

    const rating = await ratingRepo.createRating({
      userId,
      articleId: article.id,
      rating: request.body.rating
    });
    return goodHttpResponse(response, 201, 'Article rated', rating);
  }

  /**
   *
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} response
   */
  static async deleteArticle(request, response) {
    const { article, userId } = request;
    const { userid } = article.dataValues;
    if (userid === userId || request.role === 'superadmin' || request.role === 'admin') {
      await articleRepo.deleteArticle(article.dataValues);
      return goodHttpResponse(response, 202, 'Article deleted');
    }
    return goodHttpResponse(response, 401, 'You cannot deleted this article');
  }

  /**
   * Search for an article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} searched articles
   */
  static async searchArticle(request, response) {
    const { author, tag, keywords } = request.query;
    const foundArticles = await articleRepo.search(keywords, author, tag);
    if (!foundArticles.length) {
      return badHttpResponse(
        response,
        404,
        'No article was found for this search term',
      );
    }
    return goodHttpResponse(response, 200, 'Found Articles', foundArticles);
  }

  /**
   * Update an article
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async updateArticle(request, response) {
    const { id } = request.article;
    const {
      title,
      body,
      description,
      images,
    } = request.body;
    const readtime = Math.floor(body.split(' ').length / 3);

    const updatedArticle = await articleRepo.updateArticle(
      {
        title,
        body,
        description,
        readtime,
        images: images ? images.split(',') : [],
      },
      id,
    );
    return goodHttpResponse(response, 200, 'Article Updated', updatedArticle);
  }

  /**
   * Set an article as article of the day
   * Get trending articles on the platform
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} User Object
   */
  static async selectFeaturedArticle(request, response) {
    let newFeaturedArticle;
    let prevFeaturedArticle = await articleRepo.removeFeaturedArticle();
    prevFeaturedArticle = prevFeaturedArticle ? prevFeaturedArticle.slug : null;

    if (request.body.slug) {
      newFeaturedArticle = await articleRepo.makeFeaturedArticle(request.body.slug);

      const {
        id, title, slug, userid, description, readtime, images, isDeleted,
      } = newFeaturedArticle.dataValues;
      const data = {
        id,
        title,
        slug,
        userid,
        description,
        readtime,
        images,
        isDeleted,
        prevFeaturedArticle,
      };
      return goodHttpResponse(
        response,
        200,
        `You have selected article ${newFeaturedArticle.slug} as article of the day`,
        data,
      );
    }

    let allArticles = await articleRepo.getAllArticles();
    allArticles = rankArticles(allArticles);

    const benchmark = Math.ceil(allArticles.length * 0.05);

    const topArticles = [];
    for (let i = 0; i <= benchmark; i += 1) {
      if (allArticles[i].dataValues.rank !== Infinity
        || allArticles[i].dataValues.isDeleted !== true) {
        topArticles.push(allArticles[i].dataValues);
      }
    }
    const randomIndex = Math.floor(Math.random() * topArticles.length);

    newFeaturedArticle = topArticles[randomIndex];
    const {
      id, title, slug, userid, description, readtime, images, isDeleted, rank,
    } = newFeaturedArticle;

    await articleRepo.makeFeaturedArticle(slug);

    const data = {
      id,
      title,
      slug,
      userid,
      description,
      readtime,
      images,
      isDeleted,
      rank,
      prevFeaturedArticle,
    };
    return goodHttpResponse(
      response,
      200,
      `The article ${slug} has been auto-selected as article of the day`,
      data,
    );
  }

  /**
   * Get the article of the day (featured article)
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Article object or error object if article is not found
   */
  static async getFeaturedArticle(request, response) {
    const article = await articleRepo.getFeaturedArticle();
    if (!article) {
      return badHttpResponse(
        response,
        404,
        'There is no featured article yet',
      );
    }

    return goodHttpResponse(
      response,
      200,
      'Featured article retrieved',
      article,
    );
  }

  /**
   * Get the article of the day (Trending articles)
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @returns {object} Article object or error object if article is not found
   */
  static async getTrendingArticles(request, response) {
    const latestReactions = await reactionRepo.getRecentReactions();
    const articleReactions = latestReactions.filter(
      reaction => reaction.dataValues.articleId !== null
    );
    const articleIds = articleReactions.map(reaction => reaction.dataValues.articleId);

    const counts = {};

    for (let i = 0; i < articleIds.length; i += 1) {
      const num = articleIds[i];
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    const trimmedArticleIds = removeArrayDuplicates(articleIds)
      .sort((a, b) => counts[a] - counts[b]);

    let articles = await articleRepo.getTrendingArticles(trimmedArticleIds);

    if (trimmedArticleIds.length <= 6) {
      return goodHttpResponse(response, 200, 'Returned successfully', articles);
    }

    articles = articles.filter((article, i) => i < 6);


    return goodHttpResponse(response, 200, 'Returned successfully', articles);
  }
}

export default Article;
