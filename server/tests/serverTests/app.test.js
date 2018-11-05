import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /*', () => {
  it('should return a welcome message', async () => {
    const response = await chai.request(app)
      .get('/');
    expect(response).to.have.status(200);
    expect(response.body.message).to.be.deep
      .equals('Welcome to Authors Haven API Version 1.0');
  });
});
