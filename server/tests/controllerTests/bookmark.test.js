import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import createToken from '../../utilities/jwtGenerator';
import userRepo from '../../repository/userRepository';
import articleRepo from '../../repository/articleRepository';

const { expect } = chai;
chai.use(chaiHttp);

const { sulliArt, sullivan } = data;
let jwtoken;
let newUser;
let article;

describe('Create a bookmark:', () => {
  before(async () => {
    newUser = await userRepo.createUser(sullivan);
    jwtoken = createToken(newUser.id);
    sulliArt.userid = newUser.id;
    article = await articleRepo.createArticle(sulliArt);
  });

  it('should return a bad request error if slug is not a string', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${article.id}/bookmarks`)
      .set({
        'x-access-token': jwtoken,
      })
      .send();
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Bad Request');
    expect(response.body.error.problem.slug).to.be.deep
      .equals('The slug parameter must be a string');
  });

  it('should bookmark a new article in the database', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${article.slug}/bookmarks`)
      .set({
        'x-access-token': jwtoken,
      })
      .send();
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('article successfully bookmarked');
  });

  it('should not bookmark an article that is not in the database', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles/how-to-cook-1227478895/bookmarks')
      .set({
        'x-access-token': jwtoken,
      })
      .send();
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('article not found');
  });
});
