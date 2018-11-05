import chai from 'chai';
import articleInputValidator from '../../utilities/articleInput';

const { expect } = chai;
let invalidArticleInput = {};
let validArticleInput = {};
before(() => {
  invalidArticleInput = {
    title: 'This is the title',
    body: 'This is the article body'
  };
  validArticleInput = {
    title: 'This is the title',
    body: 'This is the article body',
    description: 'This is the article description'
  };
});

describe('Article input:', () => {
  it('should return an invalid output', () => {
    expect(articleInputValidator).to.be.a('function');
  });


  describe('Invalid inputs', () => {
    it('should return an invalid status', () => {
      const output = articleInputValidator(invalidArticleInput, [
        'title',
        'body',
        'description'
      ]);
      expect(output.isValid).to.equal(false);
    });
  });

  describe('Valid inputs', () => {
    it('should return a valid status', () => {
      const output = articleInputValidator(validArticleInput, [
        'title',
        'body',
        'description'
      ]);
      expect(output.isValid).to.equal(true);
    });
  });
});
