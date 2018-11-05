import chai from 'chai';
import articleRepo from '../../repository/articleRepository';

const { expect } = chai;

describe('Get all articles', () => {
  it('should get all articles', async () => {
    const articles = await articleRepo.getArticles(10, 1);
    expect(articles.rows).to.be.an('array');
  });
});
