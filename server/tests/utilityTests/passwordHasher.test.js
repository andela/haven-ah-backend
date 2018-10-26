import chai from 'chai';
import password from '../../utilities/passwordHasher';

const { expect } = chai;
const { hash, compare } = password;

describe('Password hashing utility', () => {
  it('should return true on comparing the hashed password against the supplied password', () => {
    const isSame = compare('password', hash('password'));
    expect(isSame).to.be.deep.eql(true);
  });
});
