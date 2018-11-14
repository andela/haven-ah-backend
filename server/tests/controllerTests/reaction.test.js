import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import createToken from '../../utilities/jwtGenerator';
import userRepo from '../../repository/userRepository';
import articleRepo from '../../repository/articleRepository';

const { expect } = chai;
chai.use(chaiHttp);

const { wisdomArt, wizzy } = data;
let jwtoken;
let newUser;
let article;

describe('Article Reaction:', () => {
  before(async () => {
    newUser = await userRepo.createUser(wizzy);
    jwtoken = createToken(newUser.id);
    wisdomArt.userid = newUser.id;
    article = await articleRepo.createArticle(wisdomArt);
  });

  it('should allow a logged in user to like an article', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${article.slug}/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Like' });
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep.equals('You liked this article');
  });

  it('should allow a logged in user to love an article', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${article.slug}/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Love' });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('You loved this article');
  });

  it('should allow a logged in user to update reaction', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${article.slug}/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Love' });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('You have removed your reaction');
  });

  it('should not allow an invalid value as a reaction type', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${article.slug}/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Likee' });
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Bad Request');
  });
  it('should not add reaction if article does not exist', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles/just-a-weird-slug-100988/reactions')
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Like' });
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep.equals('This article was not found.');
  });
});
