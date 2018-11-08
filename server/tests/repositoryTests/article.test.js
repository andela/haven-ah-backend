import chai from 'chai';
import articleRepo from '../../repository/articleRepository';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';

const { expect } = chai;

const { sulliArt, sullibus } = data;
let newUser;
let article;

describe('Get all articles', () => {
  it('should get all articles', async () => {
    const articles = await articleRepo.getArticles(10, 1);
    expect(articles.rows).to.be.an('array');
  });
});

describe('delete article', () => {
  before(async () => {
    newUser = await userRepo.createUser(sullibus);
    sulliArt.userid = newUser.id;
    article = await articleRepo.createArticle(sulliArt);
  });
  it('should delete article', async () => {
    const articles = await articleRepo.deleteArticle(article);
    expect(articles).to.eql(undefined);
  });
});

describe('Get article by param', () => {
  describe('Non existent record:', () => {
    it('should return null', async () => {
      const nonExistentArticle = await articleRepo.getArticleBySlug('non-existent-article-108888232');
      expect(nonExistentArticle).to.equal(null);
    });
  });
});
