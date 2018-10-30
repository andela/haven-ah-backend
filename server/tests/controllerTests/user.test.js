/* eslint prefer-destructuring: 0 */
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
let token;
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  + '.eyJpZCI6NCwiaWF0IjoxNTM5MDIxMjY1LCJleHAiOjE1Mzk2MjYwNjV9'
  + '.ErGsV_EppHmfSdvAGBkmVwL_BjGdujyLh7k1wkG_vXo';

before(async () => {
  await userRepo.createUser(theo);
});

describe('POST api/v1/users/signup', () => {
  it('should return an error if user already exists', async () => {
    const response = await chai.request(app)
      .post('/api/v1/users/signup')
      .send(theo);


    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.deep
      .equals('This account already exists. Consider sign in.');
  });

  it('should return a welcome message if signup is successful', async () => {
    const response = await chai.request(app)
      .post('/api/v1/users/signup')
      .send(sull);
    token = response.body.data.token;
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
    expect(response.body.data).to.have.property('token');
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

describe('GET api/v1/users', () => {
  it('should return an error if user is not signed in', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users');

    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.deep
      .equals('You need to sign in first');
  });

  it('should return an error if token could not be verified', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users')
      .set('x-access-token', fakeToken);

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.deep
      .equals('Sorry, try signing in again');
  });

  it('should return all users', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users')
      .set('x-access-token', token);

    expect(response.status).to.be.equal(200);
    expect(response.body.message).to.be.deep
      .equals('Users found');
  });
});
