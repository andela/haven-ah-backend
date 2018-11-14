import { expect } from 'chai';
import userRepo from '../../repository/userRepository';
import articleRepo from '../../repository/articleRepository';
import reactionRepo from '../../repository/reactionRepository';
import data from '../utilities/mockData';

const { wiz, wizArt } = data;


describe('user reaction', async () => {
  let newUser;
  let newArticle;
  before(async () => {
    newUser = await userRepo.createUser(wiz, 'user');
    wizArt.userid = newUser.id;
    newArticle = await articleRepo.createArticle(wizArt);
  });
  it('should create a new reaction', async () => {
    const newReaction = await reactionRepo.createReaction('articleId', newArticle.id, newUser.id, 'Like');
    expect(newReaction).to.be.an('object');
  });
  it('should find reaction', async () => {
    const newReaction = await reactionRepo.getReaction('articleId', newArticle.id, newUser.id);
    expect(newReaction).to.be.be.an('object');
    expect(newReaction.reactionType).to.be.equals('Like');
  });
  it('should update reaction', async () => {
    const updatedReaction = await reactionRepo.updateReaction('articleId', newArticle.id, newUser.id, 'Love');
    expect(updatedReaction).to.be.an('array');
  });
  it('should remove reaction', async () => {
    const deletedReaction = await reactionRepo.removeReaction('articleId', newArticle.id, newUser.id);
    expect(deletedReaction).to.eql(1);
  });
});
