import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
chai.use(chaiHttp);

const {
  theo, sull, noPassword, noEmail, wrongPassword, wrongEmail,
} = data;


const route = '/api/v1/users/signup';
const signinRoute = '/api/v1/users/signin';

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

describe('POST api/users/signin', () => {
  it('should signin user with correct details', async () => {
    const response = await chai.request(app)
      .post(signinRoute)
      .send(sull);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.data.output).to.have.property('token');
    expect(response.body.message).to.deep.equals('Hello i_amsull, Welcome Back!');
  });
  it('should not sign in user without password', async () => {
    const response = await chai.request(app)
      .post(signinRoute)
      .send(noPassword);
    expect(response.status).to.equal(400);
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.be.deep.equals('Invalid input');
    expect(response.body.error.problem.passwordLength).to.be.deep.equals('The password length should be atleast 8 characters. ');
  });
  it('should not sign in user without email address', async () => {
    const response = await chai.request(app)
      .post(signinRoute)
      .send(noEmail);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body.message).to.be.deep.equals('Invalid input');
    expect(response.body.error.problem.email).to.be.deep.equals('The Email provided is invalid. ');
  });
  it('should not sign in user with an incorrect password', async () => {
    const response = await chai.request(app)
      .post(signinRoute)
      .send(wrongPassword);
    expect(response).to.have.status(401);
    expect(response.body).to.be.an('object');
    expect(response.body.message)
      .to.equal('incorrect password, please try again');
  });
  it('should not sign in user with an incorrect email', async () => {
    const response = await chai.request(app)
      .post(signinRoute)
      .send(wrongEmail);
    expect(response.status).to.equal(404);
    expect(response.body).to.be.an('object');
    expect(response.body.message)
      .to.equal('This account does not exist. Consider signing up.');
  });
});
