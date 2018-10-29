/**
 * Removes whitespaces from incoming strings
 * @param {object} req Request Object
 * @param {object} res Response Objects
 * @return {Function} Next Calls the next middleware
 */

const cleanStrings = (request, response, next) => {
  Object.keys(request.body).forEach((key) => {
    if (typeof request.body[key] === 'string') {
      request.body[key] = request.body[key]
        .replace(/  +/g, ' ')
        .trim();
    }
  });
  return next();
};

export default cleanStrings;
