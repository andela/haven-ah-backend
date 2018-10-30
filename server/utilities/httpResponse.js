/**
 * Bad HTTP response template
 * @param { object } response
 * @param { integer } statusCode
 * @param { string } message
 * @param { object } data
 * @returns {object} response
 * @example goodHttpResponse(response, 200, 'user Theo found', {id: 1, username: 'theo.io'});
 */
export const goodHttpResponse = (response, statusCode, message, data) => {
  const responseBody = {
    status: statusCode,
    message,
    data,
  };
  if (data) {
    responseBody.data = data;
  }
  return response.status(statusCode).json(responseBody);
};

/**
 * Bad HTTP response template
 * @param { object } response
 * @param { integer } statusCode
 * @param { string } message
 * @param { object || string } problem
 * @returns {object} response
 * @example badHttpResponse(response, 404, 'user Theo not found');
 */

export const badHttpResponse = (response, statusCode, message, problem) => {
  const responseBody = {
    status: statusCode,
    message,
  };

  if (problem) {
    responseBody.error = { problem };
  }
  return response.status(statusCode).json(responseBody);
};
