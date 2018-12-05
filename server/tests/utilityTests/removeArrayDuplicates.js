import chai from 'chai';
import removeArrayDuplicates from '../../utilities/removeArrayDuplicates';

const { expect } = chai;

const testArray = [1, 2, 3, 4, 1, 1, 1, 2];

describe('Process Arrays: ', () => {
  it('should remove duplicates from arrays', () => {
    expect(removeArrayDuplicates(testArray).length).to.equal(4);
    expect(removeArrayDuplicates(testArray)).to.be.deep.equal([1, 2, 3, 4]);
  });
});
