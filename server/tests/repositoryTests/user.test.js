import chai from 'chai';
import userRepo from '../../repository/userRepository';
import data from '../utilities/mockData';

const { expect } = chai;
const { priscilla, joe } = data;

after(async () => {
  await userRepo.deleteUser(priscilla);
  await userRepo.deleteUser(joe);
});

describe('Get user by email function', () => {
  let newUser;
  before(async () => {
    newUser = await userRepo.createUser(priscilla);
  });

  it('should return null if user does not exist', async () => {
    const user = await userRepo.getUserByCredentials(joe.email);
    expect(user).to.be.deep.equals(null);
  });

  it('should return user if user exists', async () => {
    const result = await userRepo.getUserByCredentials(priscilla.email, priscilla.username);
    const existingUser = result[0].dataValues;
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

describe('Get all users', () => {
  it('should get all users with role as user', async () => {
    const allUsers = await userRepo.getAllUsers();
    const firstUser = allUsers[0];
    expect(allUsers).to.be.an('array');
    expect(firstUser).to.have.property('username');
    expect(firstUser).to.have.property('firstName');
    expect(firstUser).to.have.property('id');
  });
});
