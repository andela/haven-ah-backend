import paramValidator from './paramsValidator';
import { LIKE, DISLIKE, LOVE } from '../utilities/reactionConstant';

const numberPattern = /^[0-9]+$/;

const stringPattern = {
  type: 'string',
  pattern: /[a-zA-Z]+[0-9]*/,
};

const usernamePattern = {
  type: 'string',
  pattern: /^[a-zA-Z]+[a-zA-Z0-9_]+$/,
};

const complaintEnum = {
  type: 'enum',
  pattern: ['Rules Violation', 'Abuse', 'Plagiarism', 'Others']
};

const reactionEnum = {
  type: 'enum',
  pattern: [LIKE, DISLIKE, LOVE]
};

const slugPattern = {
  type: 'string',
  pattern: /(?:\w-)+\d+$/,
};

/**
 * Calls the param validator and passes expected input definitions to it.
 */
const validator = {
  validateUsername: paramValidator({
    params: {
      username: usernamePattern
    },
  }),
  validateSlug: paramValidator({
    params: {
      slug: slugPattern
    },
  }),
  validateComplaint: paramValidator({
    params: {
      slug: slugPattern
    },
    body: {
      complaintType: complaintEnum,
      complaintBody: stringPattern
    },
  }),
  validateReaction: paramValidator({
    params: {
      slug: slugPattern
    },
    body: {
      reactionType: reactionEnum,
    },
  }),
};

export default validator;
