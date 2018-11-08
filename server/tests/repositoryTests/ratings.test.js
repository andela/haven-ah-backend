import chai from 'chai';
import ratingRepo from '../../repository/ratingRepository';

const { expect } = chai;

describe('Ratings:', () => {
  it('should be a function', () => {
    expect(ratingRepo.createRating).to.be.a('function');
  });
});
