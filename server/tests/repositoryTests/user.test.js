import chai from 'chai';
import userRepo from '../../repository/userRepository';
import data from '../utilities/mockData';

const { expect } = chai;
const {
  priscilla, joe, moses, michael, goodUserUpdate,
} = data;

after(async () => {
  await userRepo.deleteUser(priscilla);
  await userRepo.deleteUser(joe);
});
let newUser;

describe('Get user by email and username function', () => {
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

describe('Get user by email function', () => {
  it('should return null if user does not exist', async () => {
    const user = await userRepo.getUserByEmail('newemail@gmail.com');
    expect(user).to.be.deep.equals(null);
  });

  it('should return user if user exists', async () => {
    const user = await userRepo.getUserByEmail(priscilla.email);

    expect(user).to.be.an('object');
    expect(user.email).to.be.deep.equals(priscilla.email);
    expect(user.firstName).to.be.deep.equals(priscilla.firstName);
    expect(user.lastName).to.be.deep.equals(priscilla.lastName);
    expect(user.username).to.be.deep.equals(priscilla.username);
    expect(user.role).to.be.deep.equals('user');
  });
});

describe('Get user by id function', () => {
  it('should return null if user does not exist', async () => {
    const user = await userRepo.getUserById(50);
    expect(user).to.be.deep.equals(null);
  });

  it('should return user if user exists', async () => {
    const user = await userRepo.getUserById(newUser.id);

    expect(user).to.be.an('object');
    expect(user.email).to.be.deep.equals(priscilla.email);
    expect(user.firstName).to.be.deep.equals(priscilla.firstName);
    expect(user.lastName).to.be.deep.equals(priscilla.lastName);
    expect(user.username).to.be.deep.equals(priscilla.username);
    expect(user.role).to.be.deep.equals('user');
  });
});

describe('Create user function', () => {
  it('should create a new user with a user role', async () => {
    const registeredUser = await userRepo.createUser(joe);

    expect(userRepo.createUser).to.be.a('function');
    expect(registeredUser).to.be.an('object');
    expect(registeredUser.username).to.be.deep.equals(joe.username);
    expect(registeredUser.firstName).to.be.deep.equals(joe.firstName);
    expect(registeredUser.role).to.be.deep.equals('user');
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

describe('Confirm email function', () => {
  it('should return null if user does not exist', async () => {
    const user = await userRepo.confirmUserEmail(50);
    expect(user).to.be.deep.equals(null);
  });

  it('should set user.isConfirmed to true', async () => {
    const user = await userRepo.getUserByEmail(joe.email);

    expect(user.isConfirmed).to.be.deep.equals(false);

    await userRepo.confirmUserEmail(user.id);

    const updated = await userRepo.getUserByEmail(joe.email);
    expect(updated.isConfirmed).to.be.deep.equals(true);
  });

  it('should throw an error if user account has been previously confirmed', async () => {
    const user = await userRepo.getUserByEmail(joe.email);

    const error = await userRepo.confirmUserEmail(user.id);
    expect(error.message).to.be.deep.equals('This account has been confirmed already.');
  });
});

describe('Get user by username function', () => {
  before(async () => {
    newUser = await userRepo.createUser(moses);
  });

  it('should return null if user does not exist', async () => {
    const user = await userRepo.getUserByCredentials(moses.email);
    expect(user).to.be.deep.equals(null);
  });

  it('should return user if user exists', async () => {
    const result = await userRepo.getUserbyUsername(moses.username);
    const existingUser = result.dataValues;
    expect(existingUser).to.be.an('object');
    expect(existingUser.email).to.be.deep.equals(newUser.email);
    expect(existingUser.firstName).to.be.deep.equals(newUser.firstName);
    expect(existingUser.lastName).to.be.deep.equals(newUser.lastName);
    expect(existingUser.username).to.be.deep.equals(newUser.username);
  });
});

describe('Update user by username', () => {
  before(async () => {
    newUser = await userRepo.createUser(michael);
  });

  it('should return true after update', async () => {
    const result = await userRepo.updateUser(goodUserUpdate, newUser.username);
    expect(result).to.be.an('object');
    expect(result.firstName).to.be.deep.equals(goodUserUpdate.firstName);
    expect(result.lastName).to.be.deep.equals(goodUserUpdate.lastName);
  });
});
