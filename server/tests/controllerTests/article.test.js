import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import createToken from '../../utilities/jwtGenerator';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
chai.use(chaiHttp);

const { jigArticle, jigsaw } = data;
let jwtoken;
let newUser;

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
});
