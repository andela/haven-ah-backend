import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';
import generateToken from '../../utilities/jwtGenerator';

const { expect } = chai;
chai.use(chaiHttp);

const {
  theo, sull, dan, noPassword, noEmail, wrongPassword, wrongEmail, goodUserUpdate, badUserUpdate,
  badBioUpdate, badImageUpdate1, badImageUpdate2, noImageUpdate, usernameUpdate,
} = data;

const route = '/api/v1/users/signup';
const signinRoute = '/api/v1/users/signin';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  + '.eyJpZCI6NCwiaWF0IjoxNTM5MDIxMjY1LCJleHAiOjE1Mzk2MjYwNjV9'
  + '.ErGsV_EppHmfSdvAGBkmVwL_BjGdujyLh7k1wkG_vXo';

let newUser = '';
let token = '';
let testUser = '';
let danToken = '';
let theoToken = '';

before(async () => {
  testUser = await userRepo.createUser(dan);
  newUser = await userRepo.createUser(theo);
  token = generateToken(newUser.id);
  danToken = generateToken(testUser.id);
  theoToken = await generateToken('theo@gmail.com');
});

describe('POST api/v1/users/signup', () => {
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
      .equals(`Hello ${sull.username}, Welcome to Author's Haven. An email has been sent to your email account. Please confirm your account to proceed`);
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
    expect(response.body.error.problem.passwordLength).to.be.deep
      .equals('The password length should be atleast 8 characters. ');
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

describe('Send an email to user:', () => {
  it('should send an email to user', async () => {
    const response = await chai.request(app)
      .post('/api/v1/users/resetpassword')
      .send({
        email: 'theo@gmail.com'
      });

    expect(response.body.status).to.be.equal(200);
    expect(response.body.message).to.be.deep
      .equals('Mail delivered');
  });

  it('should reject unauthorized password reset', async () => {
    const response = await chai.request(app)
      .post('/api/v1/users/updatepassword')
      .send({
        email: 'theo@gmail.com',
      });

    expect(response.body.status).to.be.equal(403);
    expect(response.body.message).to.be.deep
      .equals('You need to sign in first');
  });

  it('should update password', async () => {
    const response = await chai.request(app)
      .post('/api/v1/users/updatepassword')
      .set('x-access-token', theoToken)
      .send({
        password: 'newpassword',
      });

    expect(response.body.status).to.be.equal(200);
    expect(response.body.message).to.be.deep
      .equals('Password updated');
  });
});

describe('GET api/v1/users/moses', () => {
  it('should return an error if user is not signed in', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users/moses');

    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.deep
      .equals('You need to sign in first');
  });

  it('should return error for user that do not exist', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users/uwabuwa')
      .set('x-access-token', token);

    // expect(response.status).to.be.equal(404);
    expect(response.body.message).to.be.deep
      .equals('User not found');
  });

  it('should return the user', async () => {
    const response = await chai.request(app)
      .get('/api/v1/users/i_amtheo')
      .set('x-access-token', token);

    expect(response.status).to.be.equal(200);
    expect(response.body.message).to.be.deep
      .equals('User found');
  });
});

describe('UPDATE api/v1/users/:username', () => {
  it('should return an error if user is not signed in', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/i_amsull')
      .send(goodUserUpdate);

    expect(response.status).to.be.equal(403);
    expect(response.body.message).to.be.deep
      .equals('You need to sign in first');
  });

  it('should update user and return data', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/i_amtheo')
      .set('x-access-token', token)
      .send(badUserUpdate);

    expect(response.status).to.be.equal(501);
    expect(response.body.message).to.be.deep
      .equals('Email change is not supported currently.');
  });

  it('should not update user if bio is bad', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/i_amtheo')
      .set('x-access-token', token)
      .send(badBioUpdate);

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.deep
      .equals('Your bio must be 200 characters or less');
  });

  it('should not update user if image being uploaded has bad url', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/i_amtheo')
      .set('x-access-token', token)
      .send(badImageUpdate1);

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.deep
      .equals('Please choose a valid image.');
  });

  it('should not update user if image being uploaded has bad image url', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/i_amtheo')
      .set('x-access-token', token)
      .send(badImageUpdate2);

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.deep
      .equals('Please ensure that the image is valid');
  });

  it('should return an error if username already exists', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/i_amtheo')
      .set('x-access-token', token)
      .send(usernameUpdate);

    expect(response.status).to.be.equal(409);
    expect(response.body.message).to.be.deep
      .equals('We found another user with the same username');
  });

  it('should update user if image is not in the data', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/i_amtheo')
      .set('x-access-token', token)
      .send(noImageUpdate);

    expect(response.status).to.be.equal(200);
    expect(response.body.message).to.be.deep
      .equals('Account updated');
  });

  it('should update user and return data', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/i_amtheo')
      .set('x-access-token', token)
      .send(goodUserUpdate);

    expect(response.status).to.be.equal(200);
    expect(response.body.message).to.be.deep
      .equals('Account updated');
  });
});

describe('POST api/v1/profiles/:username/follow', () => {
  it('should return error if username is in the wrong format', async () => {
    const response = await chai.request(app)
      .post('/api/v1/profiles/90a/follow')
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Bad Request');
  });

  it('should return error if user is not found', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/profiles/${sull.firstName}/follow`)
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals(`User with the username ${sull.firstName} does not exist.`);
  });

  it('should return error when a user tries to follow their own self', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/profiles/${theo.username}/follow`)
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Sorry, you can not follow yourself. You can only follow other users.');
  });

  it('should follow a user', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/profiles/${dan.username}/follow`)
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(201);
    expect(response.body.message).to.be.deep
      .equals('You have followed this user.');
  });

  it('should return error if user has been previously followed', async () => {
    const response = await chai.request(app)
      .post(`/api/v1/profiles/${dan.username}/follow`)
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Sorry. You already follow this user');
  });
});

describe('DELETE api/v1/profiles/:username/follow', () => {
  it('should return error if user is not found', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/profiles/${sull.firstName}/follow`)
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals(`User with the username ${sull.firstName} does not exist.`);
  });

  it('should return error when a user tries to unfollow their own self', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/profiles/${theo.username}/follow`)
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Sorry, you can not unfollow yourself.');
  });

  it('should return error if user is not a follower', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/profiles/${sull.username}/follow`)
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('Sorry. You currently don\'t follow this user.');
  });

  it('should unfollower user', async () => {
    const response = await chai.request(app)
      .delete(`/api/v1/profiles/${dan.username}/follow`)
      .set({
        'x-access-token': token,
      });

    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('You have unfollowed this user.');
  });
});

describe('GET api/v1/auth/confirm', () => {
  it('should return error if user is not found', async () => {
    await userRepo.deleteUser(dan);
    const response = await chai.request(app)
      .get(`/api/v1/auth/confirm/${danToken}`);

    expect(response).to.have.status(404);
    expect(response.body.message).to.be.deep
      .equals('This user was not found');
  });

  it('should confirm user', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/auth/confirm/${token}`);

    expect(response).to.have.status(200);
    expect(response.body).to.have.keys('status', 'message', 'data');
    expect(response.body.data).to.have.key('token');
    expect(response.body.message).to.be.deep.equals('Your email has been confirmed');
  });

  it('should return error if user email is already confirmed', async () => {
    const response = await chai.request(app)
      .get(`/api/v1/auth/confirm/${token}`);

    expect(response).to.have.status(400);
    expect(response.body.message).to.be.deep
      .equals('This account has been confirmed already.');
  });
});

describe('PUT api/v1/opt/notifications', () => {
  it('should let user opt in to email notifications', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/opt/notifications')
      .send(dan)
      .set({
        'x-access-token': token,
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('You successfully opted in to email notifications.');
    expect(response.body.data.allowNotifications).to.be.deep
      .equals(true);
  });

  it('should confirm user', async () => {
    const response = await chai.request(app)
      .put('/api/v1/users/opt/notifications')
      .send(dan)
      .set({
        'x-access-token': token,
      });
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('You successfully opted out of email notifications.');
    expect(response.body.data.allowNotifications).to.be.deep
      .equals(false);
  });
});
