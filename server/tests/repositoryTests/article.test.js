import chai from 'chai';
import articleRepo from '../../repository/articleRepository';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
const { sampleArticle, complaint } = data;

describe('Create an article', () => {
  it('should return article created', async () => {
    const article = await articleRepo.createArticle(sampleArticle);
    expect(article).to.be.an('object');
    expect(article.title).to.be.deep.equals('Looking ahead lol');
    expect(article.slug).to.be.deep.equals('Looking-ahead-lol-201811234490');
  });
});

const { sulliArt, sullibus } = data;
let newUser;
let newArticle;

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
    newArticle = await articleRepo.createArticle(sulliArt);
  });
  it('should delete article', async () => {
    const articles = await articleRepo.deleteArticle(newArticle);
    expect(articles).to.eql(undefined);
  });
  it('should return null for non-existent articles', async () => {
    const articles = await articleRepo.deleteArticle({ slug: 'fake-slug' });
    expect(articles).to.eql(null);
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
    expect(existingArticle.Author.id).to.be.deep.equal(newUser.id);
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
