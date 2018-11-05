import paramValidator from './paramsValidator';

const stringPattern = /^[a-zA-Z]+[a-zA-Z0-9_]+$/;
const numberPattern = /^[0-9]+$/;

const validator = {
  validateUsername: paramValidator({
    username: {
      type: 'string',
      pattern: stringPattern,
    }
  }),
};

export default validator;
