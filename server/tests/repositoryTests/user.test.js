import chai from 'chai';
import userRepo from '../../repository/userRepository';
import data from '../utilities/mockData';

const { expect } = chai;
const { priscilla, joe } = data;


describe('Get user by email function', () => {
  let newUser;
  before(async () => {
    newUser = await userRepo.createUser(priscilla);
  });

  it('should return null if user does not exist', async () => {
    const user = await userRepo.getUserByEmail(joe.email);
    expect(user).to.be.deep.equals(null);
  });

  it('should return user if user exists', async () => {
    const existingUser = await userRepo.getUserByEmail(priscilla.email);

    expect(existingUser).to.be.an('object');
    expect(existingUser.email).to.be.deep.equals(newUser.email);
    expect(existingUser.firstName).to.be.deep.equals(newUser.firstName);
    expect(existingUser.lastName).to.be.deep.equals(newUser.lastName);
    expect(existingUser.username).to.be.deep.equals(newUser.username);
    expect(existingUser.role).to.be.deep.equals('user');
  });
});

describe('Create user function', () => {
  it('should create a new user with a user role', async () => {
    const newUser = await userRepo.createUser(joe);

    expect(userRepo.createUser).to.be.a('function');
    expect(newUser).to.be.an('object');
    expect(newUser.username).to.be.deep.equals(joe.username);
    expect(newUser.firstName).to.be.deep.equals(joe.firstName);
    expect(newUser.role).to.be.deep.equals('user');
  });
});
