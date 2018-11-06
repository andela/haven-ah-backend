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
}

export default inputValidator;
