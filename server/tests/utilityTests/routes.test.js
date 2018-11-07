import chai from 'chai';
import router from '../../routes';

const { expect } = chai;

describe('Index route:', () => {
  it('should return a router function', () => {
    expect(router).to.be.a('function');
  });
});
