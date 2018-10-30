import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';

const { expect } = chai;
chai.use(chaiHttp);

const { jigArticle, jigsaw } = data;
let jwtoken;

describe('POST api/v1/users/signup', () => {
  it('should return an error if user already exists', async () => {
    const response = await chai.request(app)
      .post('/api/v1/users/signup')
      .send(jigsaw);
    jwtoken = response.body.data;
  });
});

describe('Post a new article:', () => {
  it('should post a new article in the database', async () => {
    const response = await chai.request(app)
      .post('/api/v1/articles')
      .set({
        'x-access-token': jwtoken,
      })
      .send(jigArticle);

    expect(response.body.status).to.be.equal(201);
    expect(response.body.message).to.be.deep
      .equals('Article Created');
  });
});
