import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import userRepo from '../../repository/userRepository';
import articleRepo from '../../repository/articleRepository';
import reactionRepo from '../../repository/reactionRepository';
import data from '../utilities/mockData';
import app from '../../../app';

const { wiz, wizArt } = data;
chai.use(chaiHttp);

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
  it('should create a new reaction', async () => {
    const newReaction = await reactionRepo.createReaction('articleId', 3, 15, 'Like');
    expect(newReaction).to.be.an('object');
  });
  it('should create a new reaction', async () => {
    const newReaction = await reactionRepo.createReaction('articleId', 4, 16, 'Love');
    expect(newReaction).to.be.an('object');
  });
  it('should create a new reaction', async () => {
    const newReaction = await reactionRepo.createReaction('articleId', 5, 15, 'Like');
    expect(newReaction).to.be.an('object');
  });
  it('should create a new reaction', async () => {
    const newReaction = await reactionRepo.createReaction('articleId', 6, 16, 'Love');
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
  describe('Should return trending articles', () => {
    it('should return an array of trending articles', async () => {
      const response = await chai.request(app)
        .get('/api/v1/articles/trending');

      expect(response).to.have.status(200);
      expect(response.body.data).to.be.an('array');
      expect(response.body.message).to.be.deep.equals('Returned successfully');
    });
  });

  describe('Add more reactions for articles', () => {
    it('should create a new reaction', async () => {
      const newReaction = await reactionRepo.createReaction('articleId', 7, 15, 'Like');
      expect(newReaction).to.be.an('object');
    });
    it('should create a new reaction', async () => {
      const newReaction = await reactionRepo.createReaction('articleId', 8, 16, 'Love');
      expect(newReaction).to.be.an('object');
    });
    it('should create a new reaction', async () => {
      const newReaction = await reactionRepo.createReaction('articleId', 9, 15, 'Like');
      expect(newReaction).to.be.an('object');
    });
    it('should create a new reaction', async () => {
      const newReaction = await reactionRepo.createReaction('articleId', 9, 16, 'Love');
      expect(newReaction).to.be.an('object');
    });
    describe('Should return trending articles', () => {
      it('should return an array of trending articles', async () => {
        const response = await chai.request(app)
          .get('/api/v1/articles/trending');

        expect(response).to.have.status(200);
        expect(response.body.data).to.be.an('array');

        expect(response.body.message).to.be.deep.equals('Returned successfully');
      });
    });
  });
});

