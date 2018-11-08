import { badHttpResponse } from '../utilities/httpResponse';

/**
 * Checks a route's parameters against the supplied definition
 * @param { object } paramsDefinition
 * Object definition of what the route parameters should look like
 * @returns { object | function }
 * Validation error response if param is not valid or absent | next function
 */
const paramValidator = paramsDefinition => (request, response, next) => {
  const { params, body } = request;
  const errors = {};
  const urlParams = paramsDefinition.params;
  const bodyParams = paramsDefinition.body;
  let isMatch;

  if (urlParams) {
    Object.keys(urlParams).forEach((key) => {
      const definition = urlParams[key];
      isMatch = definition.pattern.test(params[key]);

      if (!isMatch) {
        errors[key] = `The ${key} parameter provided is not a valid ${key}`;
      }
    });
  }

  if (bodyParams) {
    Object.keys(bodyParams).forEach((key) => {
      const definition = bodyParams[key];

      if (!body[key]) {
        errors[key] = `The ${key} parameter must be supplied`;
      } else {
        if (definition.type === 'enum') {
          isMatch = definition.pattern.includes(body[key]);
          if (!isMatch) {
            errors[key] = `The ${key} parameter must be one of these '${definition.pattern}'`;
          }
        }
        if (definition.type !== 'enum') {
          isMatch = definition.pattern.test(body[key]);
          if (!isMatch) {
            errors[key] = `The ${key} parameter supplied is not a valid ${definition.type}`;
          }
        }
      }
    });
  }

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
