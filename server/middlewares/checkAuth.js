import jwt from 'jsonwebtoken';
import config from '../config/config';
import { badHttpResponse } from '../utilities/httpResponse';
import getCurrentEnv from '../utilities/currentEnv';

const checkAuth = (request, response, next) => {
  const token = request.headers['x-access-token'];
  if (!token) {
    return badHttpResponse(
      response,
      403,
      'You need to sign in first',
      'Not authenticated'
    );
  }
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
};

export default checkAuth;
