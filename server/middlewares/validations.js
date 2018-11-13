import utilities from '../utilities/userInput';
import { badHttpResponse } from '../utilities/httpResponse';
import checkStringLen from '../utilities/checkStringLength';
import userRepo from '../repository/userRepository';
import articleValidator from '../utilities/articleInput';

const { checkMissingFields, validateUrl } = utilities;

/**
 * @class inputValidator
 *
 * @export
 *
 */
class inputValidator {
  /**
   * @description signupValidator
   * @param {object} request http request
   * @param {object} response http response
   * @param {object} next  callback function
   * @returns {object} http response object
   */
  static signupValidator(request, response, next) {
    const { isValid, problem } = checkMissingFields(request.body, [
      'username',
      'email',
      'password',
      'firstName',
      'lastName',
    ]);
    if (!isValid) {
      return badHttpResponse(response, 400, 'Invalid input', problem);
    }
    next();
  }

  /**
   * @description signinValidator
   * @param {object} request http request object
   * @param {object} response http response object
   * @param {object} next callback function
   * @returns {object} http response object
   */
  static signinValidator(request, response, next) {
    const { isValid, problem } = checkMissingFields(request.body, [
      'email',
      'password',
    ]);

    if (!isValid) {
      return badHttpResponse(response, 400, 'Invalid input', problem);
    }
    next();
  }

  /**
   * @description signinValidator
   * @param {object} request http request object
   * @param {object} response http response object
   * @param {object} next callback function
   * @returns {object} http response object
   */
  static async editProfile(request, response, next) {
    const { email, username, password } = request.body;
    if (username) {
      const user = await userRepo.getUserByParam('username', username);
      if (user) {
        return badHttpResponse(
          response,
          409,
          'We found another user with the same username',
        );
      }
    }
    if (email || password) {
      return badHttpResponse(
        response,
        501,
        'Email change is not supported currently.',
      );
    }
    if (request.body.image) {
      if (!validateUrl(request.body.image)) {
        return badHttpResponse(
          response,
          400,
          'Please choose a valid image.',
        );
      }
    }
    if (!request.body.bio) {
      return next();
    }
    if (checkStringLen(request.body.bio, 200)) {
      return next();
    }
    return badHttpResponse(
      response,
      400,
      'Your bio must be 200 characters or less',
    );
  }

  /**
   * @description articleValidator
   * @param {object} request http request object
   * @param {object} response http response object
   * @param {object} next callback function
   * @returns {object} http response object
   */
  static async articleValidator(request, response, next) {
    const { isValid, problem } = articleValidator(request.body, [
      'title',
      'description',
      'body'
    ]);
    if (!isValid) {
      return badHttpResponse(response, 400, 'Incomplete fields', problem);
    }
    next();
  }

  /**
   * @description validateComment
   * @param {object} request http request object
   * @param {object} response http response object
   * @param {object} next callback function
   * @returns {object} http response object
   */
  static async validateComment(request, response, next) {
    const { userId } = request;
    const { body, highlightedText } = request.body;
    if (!body) {
      return badHttpResponse(response, 400, 'Comment must have a body');
    }
    if (highlightedText) {
      const commentBody = {
        body,
        highlightedText,
        userId,
        isHighlighted: true,
      };
      request.body = commentBody;
      return next();
    }
    const commentBody = {
      body,
      userId,
    };
    request.body = commentBody;
    return next();
  }

  /**
   * @description validateReply
   * @param {object} request http request object
   * @param {object} response http response object
   * @param {object} next callback function
   * @returns {object} http response object
   */
  static async validateReply(request, response, next) {
    const { body } = request.body;
    let { parentId } = request.params;
    if (!body) {
      return badHttpResponse(response, 400, 'Reply must have a body');
    }
    parentId = parseInt(parentId, 10);
    if (isNaN(parentId)) {
      return badHttpResponse(response, 400, 'Please use a valid parent commentId');
    }
    request.params.parentId = parentId;
    return next();
  }

  /**
   * @description ratingValidator
   * @param {object} request http request object
   * @param {object} response http response object
   * @param {object} next callback function
   * @returns {object} http response object
   */
  static async ratingValidator(request, response, next) {
    const { isValid, problem } = articleValidator(request.body, [
      'rating'
    ]);
    if (!isValid) {
      return badHttpResponse(response, 400, 'Incomplete fields', problem);
    }
    if (request.body.rating < 1 || request.body.rating > 5) {
      return badHttpResponse(
        response,
        400,
        'Rating must be between 1 and 5'
      );
    }
    next();
  }

  /**
   * @description validate Comment Update
   * @param {object} request http request object
   * @param {object} response http response object
   * @param {object} next callback function
   * @returns {object} http response object
   */
  static async validateCommentUpdate(request, response, next) {
    const { body } = request.body;
    let { id } = request.params;
    if (!body) {
      return badHttpResponse(response, 400, 'Comment must have a body');
    }

    id = parseInt(id, 10);
    if (isNaN(id)) {
      return badHttpResponse(response, 400, 'Please use a valid comment ID');
    }
    request.params.id = id;
    return next();
  }

  /**
   * @description validate Comment ID
   * @param {object} request http request object
   * @param {object} response http response object
   * @param {object} next callback function
   * @returns {object} http response object
   */
  static async validateCommentParam(request, response, next) {
    let { id } = request.params;

    id = parseInt(id, 10);
    if (isNaN(id)) {
      return badHttpResponse(response, 400, 'Please use a valid comment ID');
    }
    request.params.id = id;
    return next();
  }
}

export default inputValidator;
