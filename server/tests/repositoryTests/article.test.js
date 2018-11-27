import chai from 'chai';
import articleRepo from '../../repository/articleRepository';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
const {
  sampleArticle, complaint, sulliArt, sullibus
} = data;

let newUser;
let newArticle;

describe('Create an article', () => {
  it('should return article created', async () => {
    newUser = await userRepo.createUser(sullibus, 'user');
    const article = await articleRepo.createArticle(sampleArticle);
    expect(article).to.be.an('object');
    expect(article.title).to.be.deep.equals('Looking ahead lol');
    expect(article.slug).to.be.deep.equals('Looking-ahead-lol-201811234490');
  });
});

describe('Get all articles', () => {
  it('should get all articles', async () => {
    const articles = await articleRepo.getArticles(10, 1);
    expect(articles.rows).to.be.an('array');
  });

  it('should get all articles when offset and limit is not passed', async () => {
    const articles = await articleRepo.getArticles();
    expect(articles.rows).to.be.an('array');
  });
});

describe('delete article', () => {
  before(async () => {
    newArticle = await articleRepo.createArticle(sulliArt);
  });

  it('should delete article', async () => {
    const articles = await articleRepo.deleteArticle(newArticle);
    expect(articles).to.eql(undefined);
  });

  it('should return null if article does not exist', async () => {
    const article = await articleRepo.deleteArticle({ slug: 'a-non-existent-slug' });
    expect(article).to.be.deep.eql(null);
  });
});

describe('Get single article', () => {
  it('should return null if article is not found', async () => {
    const article = await articleRepo.getArticleBySlug('some-weird-slug');
    expect(article).to.be.deep.equal(null);
  });

  it('should return article if found', async () => {
    const article = await articleRepo.getArticleBySlug('Looking-ahead-lol-201811234490');
    expect(article.title).to.be.deep.equal('Looking ahead lol');
    expect(article.slug).to.be.deep.equals('Looking-ahead-lol-201811234490');
  });
});

describe('Get single article function', () => {
  it('should return null if article does not exist', async () => {
    const nonExistentArticle = await articleRepo.getSingleArticle('this-is-a-slug-that-does-not-exist');
    expect(nonExistentArticle).to.be.deep.equals(null);
  });

  it('should return the article if it exists', async () => {
    const existingArticle = await articleRepo.getSingleArticle(newArticle.slug);
    expect(existingArticle.slug).to.be.deep.equals(newArticle.slug);
    expect(existingArticle).to.have.ownProperty('Author');
    expect(existingArticle.Author.dataValues).to.have
      .keys('id', 'firstName', 'lastName', 'username', 'imageUrl', 'bio');
  });
});

describe('Create new complaint', () => {
  it('should create new complaint', async () => {
    const newComplaint = await articleRepo.createArticleComplaint(complaint);
    expect(newComplaint.complaintType).to.be.deep.equal('Rules Violation');
  });
});

describe('Create user reading stat', () => {
  it('should add a new reading stat if user has not previously read the article', async () => {
    const article = await articleRepo.getArticleBySlug('Looking-ahead-lol-201811234490');
    const newStat = await articleRepo.addReadingStat(newUser.id, article.id);

    expect(newStat).to.be.an('object');
    expect(newStat.articleId).to.be.deep.equals(article.id);
    expect(newStat.userId).to.be.deep.equals(newUser.id);
  });

  it('should update row if user has previously read the article', async () => {
    const article = await articleRepo.getArticleBySlug('Looking-ahead-lol-201811234490');
    const newStat = await articleRepo.addReadingStat(newUser.id, article.id);

    expect(newStat.timeRead).to.not.be.equal(newStat.createdAt);
  });
});

describe('Get user\'s reading stats', () => {
  it('should return all read articles', async () => {
    const stats = await articleRepo.getReadArticles(newUser);

    expect(stats).to.be.an('array');
    expect(stats.length).to.be.deep.equals(1);
  });
});


describe('Make an article the hero article', () => {
  it('should return the hero article', async () => {
    const article = await articleRepo.makeHeroArticle('Looking-ahead-lol-201811234490');
    expect(article.title).to.be.deep.equal('Looking ahead lol');
    expect(article.isHeroArticle).to.be.deep.equals(true);
  });
});

describe('Remove an article as a hero article', () => {
  it('should return article after it has been removed', async () => {
    const article = await articleRepo.removeHeroArticle();
    expect(article.title).to.be.deep.equal('Looking ahead lol');
    expect(article.isHeroArticle).to.be.deep.equals(false);
  });
});

describe('Get all articles', () => {
  it('should return article if found', async () => {
    const articles = await articleRepo.getAllArticles();
    expect(articles).to.be.an('array');
    expect(articles[0].dataValues.Comments).to.be.an('array');
  });
});
