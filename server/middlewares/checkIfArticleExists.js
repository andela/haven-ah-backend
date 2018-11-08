import articleRepo from '../repository/articleRepository';
import { badHttpResponse } from '../utilities/httpResponse';

/**
   * Check if an article exists
   * @param {object} request Request Object
   * @param {object} response Response Object
   * @param {function} next Next function on the middleware chain
   * @returns {object} Error is article does not exist
   * or calls the next function
   */
const checkIfArticleExists = async (request, response, next) => {
  const { slug } = request.params;
  const article = await articleRepo.getArticleBySlug(slug);

  if (!article) {
    return badHttpResponse(
      response,
      404,
      'This article was not found.'
    );
  }
  request.article = article;
  next();
};

export default checkIfArticleExists;
