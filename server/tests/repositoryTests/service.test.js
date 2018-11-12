import chai from 'chai';
import notifiers from '../../services/notifiers';
import notifyWorker from '../../services/notifyWorker';
import notificationRepo from '../../repository/notificationRepository';
import articleTemplatingFunction from '../../emailTemplates/newArticleTemplate';
import data from '../utilities/mockData';

const { expect } = chai;
const { dummyNotifications } = data;

const htmlString = articleTemplatingFunction('jigsaw', 'message', 2);

describe('Create new notifications', () => {
  it('should be a function', () => {
    expect(articleTemplatingFunction).to.be.a('function');
  });

  it('should be a string', () => {
    expect(htmlString).to.be.a('string');
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

  it('should return null for invalid posts', async () => {
    const result = await notificationRepo.createNotification(dummyNotifications.newInvalidPost);

    expect(result)
      .to
      .equal(null);
  });

  it('should return null for invalid notification type', async () => {
    const result = await notifyWorker(dummyNotifications.wrongNotifyType);
    expect(result).to.equal(null);
  });
});

describe('Notifiers test:', () => {
  it('should be a function', async () => {
    expect(notifiers.articleNotifier).to.be.a('function');
    expect(notifiers.commentNotifier).to.be.a('function');
    expect(notifiers.reactionNotifier).to.be.a('function');
  });

  it('should return empty recipient array for unassociated users', async () => {
    const firstMailInformation = await notifiers.articleNotifier(
      dummyNotifications.newArticle,
      'dummy message',
      'dummy title'
    );
    const secondMailInformation = await notifiers.commentNotifier(
      dummyNotifications.newComment,
      'dummy message',
      'dummy title'
    );
    const thirdMailInformation = await notifiers.reactionNotifier(
      dummyNotifications.newReaction,
      'dummy message',
      'dummy title'
    );
    expect(firstMailInformation.accepted.length).to.equal(0);
    expect(secondMailInformation.accepted.length).to.equal(0);
    expect(thirdMailInformation.accepted.length).to.equal(0);
  });
});
