import utilities from '../utilities/userInput';
import { badHttpResponse } from '../utilities/httpResponse';

const { checkMissingFields } = utilities;

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
}

export default inputValidator;
