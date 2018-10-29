import utilities from '../utilities/userInput';
import { badHttpResponse } from '../utilities/httpResponse';

const { checkMissingFields } = utilities;

const inputValidator = (request, response, next) => {
  const { isValid, problem } = checkMissingFields(request.body, [
    'username',
    'email',
    'password',
    'firstName',
    'lastName',
  ]);
  if (isValid === false) {
    return badHttpResponse(response, 400, 'Invalid input', problem);
  }
  next();
};

export default inputValidator;
