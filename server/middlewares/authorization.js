import userRepo from '../repository/userRepository';
import commentRepo from '../repository/commentRepository';
import { badHttpResponse } from '../utilities/httpResponse';

/**
 * The authorization class
 */
class authorization {
  /**
   * This checks whether the user with the userId is authorized
   * to complete the request.
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @returns {function} callback function
   */
  static async userProfile(request, response, next) {
    const data = await userRepo.getUserByParam('username', request.params.username);
    const id = data ? data.id : null;
    request.isAuthorized = id === request.userId; // BOOLEAN
    return next();
  }

  /**
   * This checks whether the requester (user) is authorized
   * to complete the request on a comment.
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @returns {function} callback function
   */
  static async comment(request, response, next) {
    const comment = await commentRepo.getComment(request.params.id);
    if (comment === null) {
      return badHttpResponse(response, 404, 'We could not find this comment');
    }
    const {
      body,
      userId,
    } = comment;
    request.body.oldComment = body;
    request.isAuthorized = userId === request.userId; // BOOLEAN
    return next();
  }

  /**
   * This checks whether the requester (user) is authorized
   * to complete the request on an article.
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * @returns {function} callback function
   */
  static async checkAuthor(request, response, next) {
    const { article } = request;

    request.isAuthorized = article.userid === request.userId; // BOOLEAN
    if (!request.isAuthorized) {
      return badHttpResponse(response, 401, 'You are not permitted to complete this action');
    }
    return next();
  }
}

export default authorization;
