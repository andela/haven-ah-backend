import userRepo from '../repository/userRepository';

/**
 * This checks whether the user with the userId is authorized
 * to complete the request.
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @returns {function} callback function
 */
const authorization = async (request, response, next) => {
  const data = await userRepo.getUserByParam('username', request.params.username);
  const id = data ? data.id : null;
  request.isAuthorized = id === request.userId; // BOOLEAN
  return next();
};

export default authorization;
