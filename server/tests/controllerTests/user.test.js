import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
chai.use(chaiHttp);

const { theo, sull } = data;
const route = '/api/v1/users/signup';

before(async () => {
  await userRepo.createUser(theo);
});

describe('POST api/users/signup', () => {
  it('should return an error if user already exists', async () => {
    const response = await chai.request(app)
      .post(route)
      .send(theo);

    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.deep
      .equals('This account already exists. Consider sign in.');
  });

  it('should return a welcome message if signup is successful', async () => {
    const response = await chai.request(app)
      .post(route)
      .send(sull);

    expect(response.status).to.be.equal(201);
    expect(response.body.message).to.be.deep
      .equals(`Hello ${sull.username}, Welcome to Author's Haven.`);
  });
});
