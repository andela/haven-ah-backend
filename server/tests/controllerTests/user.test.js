import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
chai.use(chaiHttp);

const { theo, sull } = data;

before(async () => {
  await userRepo.createUser(theo);
});

describe('POST api/users/signup', () => {
  it('should return an error if user already exists', async () => {
    const response = await chai.request(app)
      .post('/api/v1/user/signup')
      .send(theo);

    expect(response.body.status).to.be.equal(409);
    expect(response.body.message).to.be.deep
      .equals(`User with this email, "${theo.email}" already exists`);
  });

  it('should return a welcome message if signup is successful', async () => {
    const response = await chai.request(app)
      .post('/api/v1/user/signup')
      .send(sull);

    expect(response.body.status).to.be.equal(201);
    expect(response.body.message).to.be.deep
      .equals(`Hello ${sull.username}, Welcome to Author's Haven.`);
  });
});
