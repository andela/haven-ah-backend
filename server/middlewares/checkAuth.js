import jwt from 'jsonwebtoken';
import config from '../config/config';
import { badHttpResponse } from '../utilities/httpResponse';
import { getCurrentEnv } from '../utilities/currentEnv';

/**
 * Checks if the current url is the get article url
 * @param {object} request Request Object
 * @returns {boolean} True if the route is the get article route
 * or false if otherwise
 */
const checkGetArticleUrl = (request) => {
  const { slug } = request.params;
  return request.originalUrl === `/api/v1/articles/${slug}` && request.method === 'GET';
};

/**
 * Middleware gaurding authenticated routes
 * @param {object} request Request Object
 * @param {Object} response Response Object
 * @param {function} next Next middleware
 * @returns {function | object} Next function on the middleware chain or an error object
 */
const checkAuth = (request, response, next) => {
  const token = request.headers['x-access-token'] || request.params.token;

  const isGetArticleUrl = checkGetArticleUrl(request);

  if (!token && !isGetArticleUrl) {
    return badHttpResponse(
      response,
      403,
      'You need to sign in first',
      'Not authenticated'
    );
  }

  if (token) {
    jwt.verify(token, config[getCurrentEnv()].secret, (error, decoded) => {
      if (error) {
        return badHttpResponse(
          response,
          401,
          'Sorry, try signing in again',
          'Authentication failed'
        );
      }
      request.userId = decoded.id;
      return next();
    });
  } else {
    return next();
  }
};

export default checkAuth;
