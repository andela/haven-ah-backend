import { equal } from 'assert';
import utilities from '../../utilities/userInput';

const { validateUsername, validateEmail, validatePassword } = utilities;

describe('User credential validation:', () => {
  describe('Invalid user input', () => {
    it('should reject invalid username', () => {
      equal(validateUsername('_7jigsaw'), false);
    });
    it('should reject invalid email', () => {
      equal(validateEmail('gsaw.com'), false);
    });
    it('should reject invalid password', () => {
      equal(validatePassword('jig$'), false);
    });
  });
  describe('Valid user inputs', () => {
    it('should accept valid username', () => {
      equal(validateUsername('jigsaw'), true);
    });
    it('should accept valid email', () => {
      equal(validateEmail('jigsaw@gmail.com'), true);
    });
    it('should accept valid password', () => {
      equal(validatePassword('jigsaw'), true);
    });
  });
});
