
import { equal } from 'assert';

describe('Array', () => {
  it('should return -1 when the value is not present', () => {
    equal([1, 2, 3].indexOf(4), -1);
  });
});
