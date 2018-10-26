import chai from 'chai';
import password from '../../utilities/passwordHasher';

const { expect } = chai;
const { hash, compare } = password;

describe('Pasword hashing utility', () => {
  it('should return true on comparing the hashed password against the supplied password', () => {
    const passwordHash = hash('password');
    const isSame = compare('password', passwordHash);
    expect(isSame).to.be.deep.eql(true);
  });
});
