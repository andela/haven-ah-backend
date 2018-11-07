import chai from 'chai';
import addRplies from '../../utilities/addReplies';
import mockData from '../utilities/mockData';

const { expect } = chai;
const { rawComments1, rawComments2 } = mockData;

describe('Add replies:', () => {
  describe('When there is no reply', () => {
    it('should return all the comments on the same level', () => {
      const comments = addRplies(rawComments1, 0);
      expect(comments.length).to.equal(rawComments1.length);
    });
  });

  describe('When there are replies', () => {
    it('should return the comments on different levels', () => {
      const comments = addRplies(rawComments2, 1);
      expect(comments[0]).to.have.ownProperty('Replies');
    });
  });
});
