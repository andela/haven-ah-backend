import { badHttpResponse } from './httpResponse';

/**
 * Wraps a function in a try catch block
 * @param {function} func Function to wrap
 * @returns {object} Error object if any error is caught
 */
const tryCatchWrapper = func => async (request, response) => {
  try {
    await func(request, response);
  } catch (error) {
    return badHttpResponse(
      response,
      500,
      error.message,
      error
    );
  }
};

export default tryCatchWrapper;
