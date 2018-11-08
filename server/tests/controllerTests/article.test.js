import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import createToken from '../../utilities/jwtGenerator';
import userRepo from '../../repository/userRepository';
import articleRepo from '../../repository/articleRepository';

const { expect } = chai;
chai.use(chaiHttp);

const {
  jigArticle, jigsaw,
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

describe('Deleting an article', () => {
  it('should return null if article is non-existent', async () => {
    const result = await articleRepo.deleteArticle({
      slug: 'fake-slug-8927429478'
    });

    expect(result).to.be.equal(null);
  });
});
