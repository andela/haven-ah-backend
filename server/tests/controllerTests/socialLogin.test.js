import chai from 'chai';
import nock from 'nock';
import socialCallback from '../../services/socialCallback';
import app from '../../../app';

const { expect } = chai;

const accessToken = 'sometoken';
const refreshToken = 'sometoken';
const profile = {
  emails: [{ value: 'uemailrl' }],
  name: {
    familyName: 'some name',
    givenName: 'some name'
  },
  photos: [{ value: 'url' }]
};

nock('https://www.facebook.com/')
  .filteringPath(() => '/api/v1/auth/facebook')
  .get('/api/v1/auth/facebook')
  .reply(200, 'facebook route called');

nock('https://www.google.com/')
  .filteringPath(() => '/api/v1/auth/google')
  .get('/api/v1/auth/google')
  .reply(200, 'google callback route called', {
    Location: '/'
  });


describe('facebook strategy', () => {
  it('should be a function', () => {
    expect(socialCallback).to.be.a('function');
  });

  it('should call the facebook route', async () => {
    const response = await chai.request(app).get('/api/v1/auth/facebook');
    expect(response).to.have.status(200);
    expect(response.text).to.be.deep.equal('facebook route called');
  });
});

describe('facebook callback function', () => {
  it('should return undefined', (done) => {
    const callBackResult = socialCallback(accessToken, refreshToken, profile, done);
    expect(callBackResult).to.be.equal(undefined);
  });
});
