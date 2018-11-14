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
  wizcom, wizComment, articleOne, sampleArticle1,
} = data;
let jwtoken;
let newUser;
let newArticle;

describe('Create comment', () => {
  before(async () => {
    newUser = await userRepo.createUser(xProdigy, 'user');
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
      .equals('This article was not found.');
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
      .equals('This article was not found.');
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

describe('Update comment', () => {
  it('should update comment in the database', async () => {
    const response = await chai.request(app)
      .put(`/api/v1/articles/${newArticle.slug}/comments/1`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(anotherGoodComment);
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('Comment updated');
  });
  it('should not update comment if it does not have body', async () => {
    const response = await chai.request(app)
      .put(`/api/v1/articles/${newArticle.slug}/comments/1`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(badComment);
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Comment must have a body');
  });
  it('should not update if comment does not exist', async () => {
    const response = await chai.request(app)
      .put('/api/v1/articles/uche-bu-a-guy/comments/1000')
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodComment);
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('We could not find this comment');
  });
  it('should not update if user is not authorized', async () => {
    const badJwToken = createToken(20);
    const response = await chai.request(app)
      .put('/api/v1/articles/uche-bu-a-guy/comments/1')
      .set({
        'x-access-token': badJwToken,
      })
      .send(goodComment);
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.deep
      .equals('You are not permitted to complete this action');
  });
  it('should return error for invalid route parameter', async () => {
    const response = await chai.request(app)
      .put(`/api/v1/articles/${newArticle.slug}/comments/uber`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodComment);
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Please use a valid comment ID');
  });
  it('should not update comment if article does not exist', async () => {
    const response = await chai.request(app)
      .put('/api/v1/articles/uche-bu-a-guy/comments/1')
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodComment);
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('We could not find this article');
  });
});

describe('Get comment and edit comment history', () => {
  it('should get comment from the database and the edit history', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/articles/${newArticle.slug}/comments/1`)
      .set({
        'x-access-token': jwtoken,
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('Comment and edit history found');
    expect(response.body.data).to.have.property('editHistory');
    expect(response.body.data.editHistory).to.be.an('array');
  });
  it('should get comment from the database and the edit history', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/articles/${newArticle.slug}/comments/2`)
      .set({
        'x-access-token': jwtoken,
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('Comment found');
    expect(response.body.data).to.have.property('editHistory');
    expect(response.body.data.editHistory).to.be.deep
      .equals('No edit history to show');
  });
  it('should not get comment if comment does not exist', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/articles/${newArticle.slug}/comments/1000`)
      .set({
        'x-access-token': jwtoken,
      });
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('We could not find this comment');
  });
  it('should return error for invalid route parameter', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/articles/${newArticle.slug}/comments/uber`)
      .set({
        'x-access-token': jwtoken,
      });
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Please use a valid comment ID');
  });
  it('should not show comment history if user is not authorized', async () => {
    const badJwToken = createToken(20);
    const response = await chai.request(app)
      .get(`/api/v1/articles/${newArticle.slug}/comments/1`)
      .set({
        'x-access-token': badJwToken,
      });
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.deep
      .equals('You are not permitted to complete this action');
  });
  it('should return error if article does not exist', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/uche-bu-a-guy/comments/1')
      .set({
        'x-access-token': jwtoken,
      });
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('We could not find this article');
  });
});

describe('comment Reaction:', () => {
  before(async () => {
    newUser = await userRepo.createUser(wizcom);
    jwtoken = createToken(newUser.id);

    articleOne.userid = newUser.id;
    articleOne.readtime = 30;
    articleOne.slug = slug(`${jigArticle.title} ${Date.now()}`);
    articleOne.images = [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ];
    newArticle = await articleRepo.createArticle(articleOne);
  });
  it('should post a new comment in the database', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(wizComment);
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('Comment created');
  });
  it('should allow a logged in user to like a comment', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/4/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Like' });
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep.equals('You liked this comment');
  });
  it('should allow a logged in user to update a reaction', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/4/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Love' });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('You loved this comment');
  });
  it('should allow a logged in user to remove a reaction', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/4/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Like' });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('You liked this comment');
  });
  it('should allow a logged in user to love a comment', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/4/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Love' });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('You loved this comment');
  });
  it('should allow a logged in user to remove reaction', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/4/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Love' });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('You have removed your reaction');
  });
  it('should not allow a logged in user to like a comment that does not belong to an article', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/1/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Like' });
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep.equals('comment does not belong to article');
  });
  it('should not react to a comment that does not exist', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${newArticle.slug}/comments/90/reactions`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({ reactionType: 'Like' });
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep.equals('comment not found');
  });
});

describe('Get comments', () => {
  let newArticle1;
  before(async () => {
    sampleArticle1.userid = newUser.id;
    sampleArticle1.readtime = 30;
    sampleArticle1.slug = slug(`${sampleArticle1.title} ${Date.now()}`);
    sampleArticle1.images = [
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
      'https%3A%2F%2Fapidocs.imgur.com%2F&psig=AOvVaw0fHxKaTEzONQX8t25O4q-8&ust=1540666595380895',
    ];
    newArticle1 = await articleRepo.createArticle(sampleArticle1);
  });
  it('should return response if comments are not found', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/articles/${newArticle1.slug}/comments`)
      .set({
        'x-access-token': jwtoken,
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('No comments on this article yet');
  });
  it('should return comments if they are found', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/articles/${newArticle.slug}/comments`)
      .set({
        'x-access-token': jwtoken,
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('Comments found');
    expect(response.body.data).to.be.an('array');
  });
  it('should not get comments if article does not exist', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/uche-bu-a-guy/comments')
      .set({
        'x-access-token': jwtoken,
      })
      .send(goodComment);
    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('This article was not found.');
  });
});
