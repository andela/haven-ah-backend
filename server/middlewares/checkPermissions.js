import permissionsConfig from '../config/permissions.config';
import { badHttpResponse } from '../utilities/httpResponse';
import processUrl from '../utilities/processUrl';
import userRepo from '../repository/userRepository';

/**
 * Middleware regulating access control on protected routes
 * @param {object} request Request Object
 * @param {Object} response Response Object
 * @param {function} next Next middleware
 * @returns {function | object} Next function on the middleware chain or an error object
 */
const checkPermissions = async (request, response, next) => {
  const resource = processUrl(request.url);

  const user = await userRepo.getUserByParam('id', request.userId);
  if (!user) {
    return badHttpResponse(response, 403, 'ACCESS DENIED');
  }

  const { role } = user.dataValues;
  request.role = role;

  if (role === 'superadmin') {
    return next();
  }

  if (!(
    permissionsConfig[role]
      && permissionsConfig[role][resource]
      && permissionsConfig[role][resource]
        .allowedMethods.find(method => method === request.method)
  )) {
    return badHttpResponse(response, 403, 'ACCESS DENIED');
  }

  return next();
};

export default checkPermissions;
