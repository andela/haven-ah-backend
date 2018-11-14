import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import createToken from '../../utilities/jwtGenerator';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
chai.use(chaiHttp);

const {
  jigArticle, jigsaw, complaint, invalidComplaint, sampleComplaint,
} = data;

let jwtoken;
let newUser;
let jigSlug;

describe('Post a new article:', () => {
  before(async () => {
    newUser = await userRepo.createUser(jigsaw);
    jwtoken = createToken(newUser.id);
  });

  it('should post a new article in the database', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles')
      .set({
        'x-access-token': jwtoken,
      })
      .send(jigArticle);

    jigSlug = response.body.data.slug;

    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('Article Created');
  });

  it('should post a new article, new tags and create associations', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles')
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        ...jigArticle,
        tags: 'philosophy metaphysics vanity'
      });
    jigSlug = response.body.data.newArticle.slug;
    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('Article Created and Tags associated');
  });
});

describe('Get all articles', () => {
  it('should return all articles in the database', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles?limit=20&page=1');
    expect(response.body.status).to.be.equal(200);
    expect(response.body.message).to.be.deep.equals('all articles');
  });
});

describe('Rating an article', () => {
  it('should rate an article in the database', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/rating`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        rating: 2
      });

    expect(response.body.status).to.be.equal(201);
    expect(response.body.message).to.be.deep.equals('Article rated');
  });

  it('should update previous rating with new value', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/rating`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        rating: 4
      });

    expect(response.body.message).to.be.deep.equals('Article rated');
  });

  it('should prevent outrageous ratings', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/rating`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({
        rating: 9
      });

    expect(response.body.status).to.be.equal(400);
    expect(response.body.message).to.be.deep.equals('Rating must be between 1 and 5');
  });

  it('should prevent posts without ratings', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/rating`)
      .set({
        'x-access-token': jwtoken,
      })
      .send({});

    expect(response.body.status).to.be.equal(400);
    expect(response.body.message).to.be.deep.equals('Incomplete fields');
  });
});

describe('POST /api/v1/articles/:slug/complaints', () => {
  let token;
  before(async () => {
    const user = await userRepo.createUser({
      email: 'new@gmail.com',
      username: 'my_username',
      firstName: 'sample',
      lastName: 'user',
      password: 'password'
    });
    token = createToken(user.id);
  });

  it('should return an error if the article does not exist', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles/just-some-weird-90293494/complaints')
      .set({
        'x-access-token': jwtoken,
      })
      .send(complaint);

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('This article was not found.');
  });

  it('should return an error if the complaint type is invalid', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': token,
      })
      .send(invalidComplaint);
    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep.equals('Bad Request');
  });

  it('should return an error if the complaintType and body is not supplied', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': token,
      })
      .send();
    expect(response).to.have.status(400);
    expect(response.body.error.problem).to.have.keys('complaintType', 'complaintBody');
    expect(response.body.error.problem.complaintType).to.be.deep
      .equals('The complaintType parameter must be supplied');
  });

  it('should return an error if the complaintBody is not valid', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': token,
      })
      .send({ complaintBody: 109302 });
    expect(response).to.have.status(400);
    expect(response.body.error.problem).to.have.keys('complaintType', 'complaintBody');
    expect(response.body.error.problem.complaintBody).to.be.deep
      .equals('The complaintBody parameter supplied is not a valid string');
  });

  it('should return an error if the user wrote the article', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': jwtoken,
      })
      .send(complaint);

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Sorry, you can not raise a complaint against your article.');
  });

  it('should return a status 201 if complaint was posted', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/articles/${jigSlug}/complaints`)
      .set({
        'x-access-token': token,
      })
      .send(sampleComplaint);

    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('You have logged a complaint on this article.');
  });
});

describe('GET api/v1/articles/:slug', () => {
  it('should return null if article does not exist', async () => {
    const response = await chai.request(app)
      .get('/api/v1/articles/some-random-slug-1093848');

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep.equals('This article was not found');
  });

  it('should return article if found', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/articles/${jigSlug}`);

    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep.equals('Article retrieved');
    expect(response.body).to.have.keys('status', 'message', 'data');
    expect(response.body.data.Author).to.have
      .keys('id', 'firstName', 'lastName', 'username', 'imageUrl', 'bio');
  });

  it('should delete a single article from the database', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/articles/${jigSlug}`)
      .set({
        'x-access-token': createToken(5000),
      });

    expect(response).to.have.status(401);
    expect(response.body.message).to.be.deep
      .equals('You cannot deleted this article');
  });

  it('should delete a single article from the database', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/articles/${jigSlug}`)
      .set({
        'x-access-token': jwtoken,
      });

    expect(response).to.have.status(202);
    expect(response.body.message).to.be.deep
      .equals('Article deleted');
  });
});
