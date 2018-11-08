import chai from 'chai';
import chaiHttp from 'chai-http';
import slug from 'slug';
import app from '../../../app';
import data from '../utilities/mockData';
import createToken from '../../utilities/jwtGenerator';
import userRepo from '../../repository/userRepository';
import articleRepo from '../../repository/articleRepository';

const { expect } = chai;
chai.use(chaiHttp);

const {
  jigArticle, xProdigy, goodComment, badComment, goodReply, anotherGoodComment,
} = data;
let jwtoken;
let newUser;
let newArticle;

describe('Create comment', () => {
  before(async () => {
    newUser = await userRepo.createUser(xProdigy);
    jwtoken = createToken(newUser.id);

    jigArticle.userid = newUser.id;
    jigArticle.readtime = 30;
    jigArticle.slug = slug(`${jigArticle.title} ${Date.now()}`);
    jigArticle.images = [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ];
    newArticle = await articleRepo.createArticle(jigArticle);
  });
  it('should post a new comment in the database', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodComment);
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('Comment created');
  });
  it('should post a new comment in the database', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(anotherGoodComment);
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('Comment created');
  });
  it('should not post a new comment if it does not have body', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(badComment);
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Comment must have a body');
  });
  it('should not post a new comment if article does not exist', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles/uche-bu-a-guy/comments')
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodComment);
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('We could not find this article');
  });
});

describe('Create reply', () => {
  before(async () => {
    jigArticle.userid = newUser.id;
    jigArticle.readtime = 30;
    jigArticle.slug = slug(`${jigArticle.title} ${Date.now()}`);
    jigArticle.images = [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ];
    newArticle = await articleRepo.createArticle(jigArticle);
    jwtoken = createToken(newUser.id);
  });

  it('should post a new reply in the database', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/1`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodReply);
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('Reply created');
  });
  it('should not post a new reply if article does not exist', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles/uche-bu-a-guy/comments/1')
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodReply);
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('We could not find this article');
  });
  it('should not post a new reply if parent comment does not exist', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/199`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodReply);
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('We could not find the parent comment with id: 199');
  });
  it('should not post a new reply if it does not have body', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/1`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(badComment);
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Reply must have a body');
  });
  it('should return error for invalid route parameter', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/uber`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodComment);
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Please use a valid parent commentId');
  });
});
