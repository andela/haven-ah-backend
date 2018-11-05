import chai from 'chai';
import checkStringLen from '../../utilities/checkStringLength';

const { expect } = chai;

describe('Check String Length Utility', () => {
  it('should return true when string is within specified limit', () => {
    expect(checkStringLen('uche', 5)).to.be.deep.eql(true);
  });
  it('should return false when string is not within specified limit', () => {
    expect(checkStringLen('uche', 3)).to.be.deep.eql(false);
  });
  it('should return error message on invalid input argument entry', () => {
    expect(checkStringLen(['uche'], 4)).to.be.deep.eql('stringInput argument must be a string');
  });
  it('should return error message on invalid input argument entry', () => {
    expect(checkStringLen('uche', '4')).to.be.deep.eql('RequireLength argument must be a number');
  });
});
