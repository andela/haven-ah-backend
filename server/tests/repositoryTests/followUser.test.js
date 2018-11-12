import chai from 'chai';
import chaiHttp from 'chai-http';
import userRepo from '../../repository/userRepository';
import followerRepo from '../../repository/followUserRepository';
import data from '../utilities/mockData';
import generateToken from '../../utilities/jwtGenerator';
import app from '../../../app';
import notificationRepo from '../../repository/notificationRepository';

const {
 theo, sull, priscilla, dummyNotifications
} = data;
chai.use(chaiHttp);
const { expect } = chai;

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

  it('should turn on sullivans notification statuis', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/opt/notifications')
      .set({
        'x-access-token': generateToken(10),
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('You successfully opted in to email notifications.');
    expect(response.body.data.allowNotifications).to.be.deep
      .equals(true);
  });

  it('should post a new comment notification', async () => {
    const result = await notificationRepo.createNotification(dummyNotifications.newComment);
    expect(result.dataValues).to.be.a('object');
    expect(result.dataValues.content).to.equal('A new comment has been posted');
  });

  it('should post a new article notification', async () => {
    const result = await notificationRepo.createNotification(dummyNotifications.newArticle);
    expect(result.dataValues).to.be.a('object');
    expect(result.dataValues.content).to.equal('A new article has been posted');
  });

  it('should post a new reaction notification', async () => {
    const result = await notificationRepo.createNotification(dummyNotifications.newReaction);
    expect(result.dataValues).to.be.a('object');
    expect(result.dataValues.content)
      .to
      .equal('A user reacted on an article you currently follow');
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
