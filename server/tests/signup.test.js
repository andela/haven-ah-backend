import { equal } from 'assert';
import utilities from '../utilities/user';

const { checkMissingFields } = utilities;

describe('Sign Up Validations', () => {
  describe('Empty Inputs:', () => {
    let invalidRequestBody;
    let output;
    beforeEach(() => {
      invalidRequestBody = {};
      output = checkMissingFields(invalidRequestBody, [
        'username',
        'email',
        'password'
      ]);
    });
    it('should return false', () => {
      equal(output.isValid, false);
    });
    it('should contain username error flag', () => {
      const usernameFlag = output
        .problem
        .invalidCredentials
        .includes('username is empty');
      equal(usernameFlag, true);
    });
    it('should contain an email error flag', () => {
      const emailFlag = output
        .problem
        .invalidCredentials
        .includes('email is empty');
      equal(emailFlag, true);
    });
    it('should contain a password error flag', () => {
      const passwordFlag = output
        .problem
        .invalidCredentials
        .includes('password is empty');
      equal(passwordFlag, true);
    });
  });
  describe('Invalid Inputs:', () => {
    let invalidRequestBody;
    let output;
    beforeEach(() => {
      invalidRequestBody = {
        username: '%$fjigsaw',
        email: 'jiggyjigy@kk',
        password: 'prof'
      };
      output = checkMissingFields(invalidRequestBody, [
        'username',
        'email',
        'password'
      ]);
    });
    it('should return false', () => {
      equal(output.isValid, false);
    });
    it('should contain username error message', () => {
      const usernameFlag = output
        .problem
        .username
        .includes('The username must begin with an alphabet');
      equal(usernameFlag, true);
    });
    it('should contain an email error message', () => {
      const emailFlag = output
        .problem
        .email
        .includes('Email provided is invalid');
      equal(emailFlag, true);
    });
    it('should contain a password error message', () => {
      const passwordFlag = output
        .problem
        .passwordLength
        .includes('The password length should be atleast 8 characters');
      equal(passwordFlag, true);
    });
  });
  describe('Valid Inputs:', () => {
    let validRequestBody;
    let output;
    beforeEach(() => {
      validRequestBody = {
        username: 'profjigsaw',
        email: 'jiggy@gmail.com',
        password: 'professorjigsaw',
      };
      output = checkMissingFields(validRequestBody, [
        'username',
        'email',
        'password'
      ]);
    });
    it('should return true', () => {
      equal(output.isValid, true);
    });
    it('should return empty problem object', () => {
      equal(typeof output.probem, 'undefined');
    });
  });
});
