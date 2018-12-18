import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import createToken from '../../utilities/jwtGenerator';
import userRepo from '../../repository/userRepository';
import articleRepo from '../../repository/articleRepository';

const { expect } = chai;
chai.use(chaiHttp);

const { sulliArt, sullivan, ucheBookmark } = data;
const xToken = createToken(1000);
let jwtoken;
let bookmarkToken;
let newUser;
let newUser2;
let article;

describe('Create a bookmark:', () => {
  before(async () => {
    newUser = await userRepo.createUser(sullivan, 'user');
    newUser2 = await userRepo.createUser(ucheBookmark);
    bookmarkToken = createToken(newUser2.id);
    jwtoken = createToken(newUser.id);
    sulliArt.userid = newUser.id;
    article = await articleRepo.createArticle(sulliArt);
  });

  it('should return a bad request error if slug is not a string', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/users/wizsurlivan/bookmarks/${article.id}`)
      .set({
        'x-access-token': jwtoken,
      })
      .send();
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Bad Request');
    expect(response.body.error.problem.slug).to.be.deep
      .equals('The slug parameter provided is not a valid slug');
  });

  it('should bookmark a new article in the database', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/users/wizsurlivan/bookmarks/${article.slug}`)
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
      .post('/api/v1/users/wizsurlivan/bookmarks/how-to-cook-1227478895')
      .set({
        'x-access-token': jwtoken,
      })
      .send();
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('This article was not found.');
  });
});

describe('Get all bookmarked article by a user', () => {
  it('should not bookmark an article that is not in the database', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users/wizsurlivan/bookmarks')
      .set({
        'x-access-token': jwtoken,
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('Bookmarked Articles retrieved');
  });

  it('should return an error message if user has no bookmarked article', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users/bookmark/bookmarks')
      .set({
        'x-access-token': bookmarkToken,
      });
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('No bookmarked Article found');
  });
});

describe('Delete a bookmark:', () => {
  it('should not delete a bookmark if requester is not authorised', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/users/wizsurlivan/bookmarks/${article.slug}/1`)
      .set({
        'x-access-token': 'cvvdhahdvshsavd-xdsuzxbvchx7e36wre63whvzvchsavzx',
      })
      .send();
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.deep
      .equals('Sorry, try signing in again');
  });

  it('should delete a bookmark from the database', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/users/wizsurlivan/bookmarks/${article.slug}/1`)
      .set({
        'x-access-token': jwtoken,
      })
      .send();
    expect(response).to.have.status(202);
    expect(response.body.message).to.be.deep
      .equals('bookmark successfully removed');
  });
  it('should not delete a bookmark if bookmark does not exist', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/users/wizsurlivan/bookmarks/${article.slug}/1000`)
      .set({
        'x-access-token': jwtoken,
      })
      .send();
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('We could not find this bookmark');
  });

  it('should not bookmark an article that is not in the database', async () => {
    const response = await chai.request(app)
      .delete('/api/v1/users/wizsurlivan/bookmarks/how-to-cook-1227478895/1')
      .set({
        'x-access-token': jwtoken,
      })
      .send();
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('This article was not found.');
  });
});
