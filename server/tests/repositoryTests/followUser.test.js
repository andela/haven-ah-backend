import { expect } from 'chai';
import userRepo from '../../repository/userRepository';
import followerRepo from '../../repository/followUserRepository';
import data from '../utilities/mockData';

const { theo, sull, priscilla } = data;

let theoUser = '';
let sullUser = '';
let priscillaUser = '';

describe('function to follow a user', async () => {
  it('should create a new follower', async () => {
    theoUser = await userRepo.getUserByParam('email', theo.email);
    sullUser = await userRepo.getUserByParam('email', sull.email);
    const newFollower = await followerRepo.followUser(theoUser, sullUser);
    expect(newFollower).to.be.an('array');
  });

  it('should throw error if user is already being followed', async () => {
    const existingFollowerError = await followerRepo.followUser(theoUser, sullUser);

    expect(existingFollowerError.message).to.be.deep
      .equals('Sorry. You already follow this user');
  });
});

describe('function to unfollow a user', async () => {
  it('should return an error if user is currently not a follower', async () => {
    theoUser = await userRepo.getUserByParam('email', theo.email);
    priscillaUser = await userRepo.getUserByParam('email', priscilla.email);

    const unfollowError = await followerRepo.unfollowUser(theoUser, priscillaUser);
    expect(unfollowError.message).to.be.deep.equals('Sorry. You currently don\'t follow this user.');
  });

  it('should unfollow user', async () => {
    const newUnfollowing = await followerRepo.unfollowUser(theoUser, sullUser);
    expect(newUnfollowing).to.be.deep.equals(1);
  });
});
