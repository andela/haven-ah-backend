import chai from 'chai';
import userRepo from '../../repository/userRepository';
import data from '../utilities/mockData';

const { expect } = chai;
const {
  priscilla, joe, michael, goodUserUpdate,
} = data;

after(async () => {
  await userRepo.deleteUser(priscilla);
  await userRepo.deleteUser(joe);
});
let newUser;

before(async () => {
  newUser = await userRepo.createUser(priscilla, 'user');
});

describe('Get user by param', () => {
  describe('Get user by email parameter', () => {
    it('should return null if user does not exist', async () => {
      const user = await userRepo.getUserByParam('email', 'newemail@gmail.com');
      expect(user).to.be.deep.equals(null);
    });

    it('should return user if user exists', async () => {
      const user = await userRepo.getUserByParam('email', priscilla.email);

      expect(user).to.be.an('object');
      expect(user.email).to.be.deep.equals(priscilla.email);
      expect(user.firstName).to.be.deep.equals(priscilla.firstName);
      expect(user.lastName).to.be.deep.equals(priscilla.lastName);
      expect(user.username).to.be.deep.equals(priscilla.username);
      expect(user.role).to.be.deep.equals('user');
    });
  });

  describe('Get user by id parameter', () => {
    it('should return null if user does not exist', async () => {
      const user = await userRepo.getUserByParam('id', 50);
      expect(user).to.be.deep.equals(null);
    });

    it('should return user if user exists', async () => {
      const user = await userRepo.getUserByParam('id', newUser.id);

      expect(user).to.be.an('object');
      expect(user.email).to.be.deep.equals(priscilla.email);
      expect(user.firstName).to.be.deep.equals(priscilla.firstName);
      expect(user.lastName).to.be.deep.equals(priscilla.lastName);
      expect(user.username).to.be.deep.equals(priscilla.username);
      expect(user.role).to.be.deep.equals('user');
    });
  });

  describe('Get user by username parameter', () => {
    it('should return null if user does not exist', async () => {
      const user = await userRepo.getUserByParam('username', 'lisby');
      expect(user).to.be.deep.equals(null);
    });

    it('should return user if user exists', async () => {
      const user = await userRepo.getUserByParam('username', priscilla.username);

      expect(user).to.be.an('object');
      expect(user.email).to.be.deep.equals(priscilla.email);
      expect(user.firstName).to.be.deep.equals(priscilla.firstName);
      expect(user.lastName).to.be.deep.equals(priscilla.lastName);
      expect(user.username).to.be.deep.equals(priscilla.username);
      expect(user.role).to.be.deep.equals('user');
    });
  });
});


describe('Create user function', () => {
  it('should create a new user with a user role', async () => {
    const registeredUser = await userRepo.createUser(joe, 'user');

    expect(userRepo.createUser).to.be.a('function');
    expect(registeredUser).to.be.an('object');
    expect(registeredUser.username).to.be.deep.equals(joe.username);
    expect(registeredUser.firstName).to.be.deep.equals(joe.firstName);
    expect(registeredUser.role).to.be.deep.equals('user');
  });
});

describe('Get user by email and username function', () => {
  it('should return null if user does not exist', async () => {
    const user = await userRepo.getUserByCredentials('joe.email', 'priscilla.username');
    expect(user).to.be.deep.equals(null);
  });

  it('should return user if email exists', async () => {
    const existingUser = await userRepo.getUserByCredentials(priscilla.email, 'joe.username');

    expect(existingUser).to.be.an('object');
    expect(existingUser.email).to.be.deep.equals(newUser.email);
    expect(existingUser.firstName).to.be.deep.equals(newUser.firstName);
    expect(existingUser.lastName).to.be.deep.equals(newUser.lastName);
    expect(existingUser.username).to.be.deep.equals(newUser.username);
    expect(existingUser.role).to.be.deep.equals('user');
  });

  it('should return user if username exists', async () => {
    const existingUser = await userRepo.getUserByCredentials('priscilla.email', priscilla.username);

    expect(existingUser).to.be.an('object');
    expect(existingUser.email).to.be.deep.equals(newUser.email);
    expect(existingUser.firstName).to.be.deep.equals(newUser.firstName);
    expect(existingUser.lastName).to.be.deep.equals(newUser.lastName);
    expect(existingUser.username).to.be.deep.equals(newUser.username);
    expect(existingUser.role).to.be.deep.equals('user');
  });

  it('should return user if both email and username exists', async () => {
    const existingUser = await userRepo.getUserByCredentials(priscilla.email, priscilla.username);

    expect(existingUser).to.be.an('object');
    expect(existingUser.email).to.be.deep.equals(newUser.email);
    expect(existingUser.firstName).to.be.deep.equals(newUser.firstName);
    expect(existingUser.lastName).to.be.deep.equals(newUser.lastName);
    expect(existingUser.username).to.be.deep.equals(newUser.username);
    expect(existingUser.role).to.be.deep.equals('user');
  });
});

describe('Delete user', () => {
  it('should return null if user soes not exist', async () => {
    const result = await userRepo.deleteUser({ username: 'noneExistent' });
    expect(result).to.be.deep.equals(null);
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
    const user = await userRepo.getUserByParam('email', joe.email);
    expect(user.isConfirmed).to.be.deep.equals(false);

    await userRepo.confirmUserEmail(user.id);

    const updated = await userRepo.getUserByParam('email', joe.email);
    expect(updated.isConfirmed).to.be.deep.equals(true);
  });

  it('should throw an error if user account has been previously confirmed', async () => {
    const user = await userRepo.getUserByParam('email', joe.email);

    const error = await userRepo.confirmUserEmail(user.id);
    expect(error.message).to.be.deep.equals('This account has been confirmed already.');
  });
});

describe('Update user by username', () => {
  before(async () => {
    newUser = await userRepo.createUser(michael, 'user');
  });

  it('should return true after update', async () => {
    const result = await userRepo.updateUser(goodUserUpdate, newUser.username);
    expect(result).to.be.an('object');
    expect(result.firstName).to.be.deep.equals(goodUserUpdate.firstName);
    expect(result.lastName).to.be.deep.equals(goodUserUpdate.lastName);
  });
});

describe('Set featured author function', () => {
  it('should set user as featured author', async () => {
    const featuredAuthor = await userRepo.setFeaturedAuthor(priscilla.username);
    expect(featuredAuthor.isFeaturedAuthor).to.be.equal(true);
  });

  it('should update user if previously featured', async () => {
    const featuredAuthor = await userRepo.setFeaturedAuthor(joe.username);
    const previouslyFeatured = await userRepo.getUserByParam('username', priscilla.username);

    expect(previouslyFeatured.isFeaturedAuthor).to.be.equal(false);
    expect(featuredAuthor.isFeaturedAuthor).to.be.equal(true);
  });
});
