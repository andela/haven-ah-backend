import chai from 'chai';
import bookmarkRepo from '../../repository/bookmarkRepository';

const { expect } = chai;

describe('Create bookmark', () => {
  it('should get create bookmark', async () => {
    const bookmark = await bookmarkRepo.createBookmark(10, 1);
    expect(bookmark).to.be.an('array');
  });
});
