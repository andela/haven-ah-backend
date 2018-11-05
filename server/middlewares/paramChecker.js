import paramValidator from './paramsValidator';

const stringPattern = /^[a-zA-Z]+[a-zA-Z0-9_]+$/;
const numberPattern = /^[0-9]+$/;
const slugPattern = /(?:\w-)+\d+$/;

const validator = {
  validateUsername: paramValidator({
    username: {
      type: 'string',
      pattern: stringPattern,
    }
  }),

  validateSlug: paramValidator({
    slug: {
      type: 'string',
      pattern: slugPattern
    }
  }),
};

export default validator;
