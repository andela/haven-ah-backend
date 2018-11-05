import { badHttpResponse } from '../utilities/httpResponse';

/**
 * Checks a route's parameters against the supplied definition
 * @param { object } paramsDefinition
 * Object definition of what the route parameters should look like
 * @returns { object | function }
 * Validation error response if param is not valid or absent | next function
 */
const paramValidator = paramsDefinition => (request, response, next) => {
  const { params } = request;
  const errors = {};

  Object.keys(paramsDefinition).forEach((key) => {
    const definition = paramsDefinition[key];
    const isMatch = definition.pattern.test(params[key]);

    if (!isMatch) {
      errors[key] = `The ${key} parameter must be a ${definition.type}`;
    }
  });

  if (Object.entries(errors).length > 0) {
    return badHttpResponse(
      response,
      400,
      'Bad Request',
      errors,
    );
  }
  return next();
};

export default paramValidator;
