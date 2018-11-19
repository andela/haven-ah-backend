import chai from 'chai';
import commentRepo from '../../repository/commentRepository';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
const { goodComment, commentHistData, xtremeCassey } = data;
let history, comment, comments;

describe('Create comment', () => {
  before(async () => {
    goodComment.articleId = 1;
    const user = await userRepo.createUser(xtremeCassey, 'user');
    goodComment.userId = user.id;
    comment = await commentRepo.createComment(goodComment);
  });

  it('should post a new comment to the database', async () => {
    expect(comment.userId).to.be.eql(goodComment.userId);
    expect(comment.body).to.be.eql(goodComment.body);
  });
});

describe('Update comment', () => {
  before(async () => {
    history = await commentRepo.createCommentHistory(commentHistData);
  });

  it('should post an old comment to the database', async () => {
    expect(history.commentId).to.be.eql(commentHistData.commentId);
    expect(history.oldComment).to.be.eql(commentHistData.oldComment);
  });
});

describe('Get comments for article', () => {
  before(async () => {
    comments = await commentRepo.getCommentsOnArticle(1);
  });

  it('should post an old comment to the database', async () => {
    expect(comments).to.be.an('array');
    expect(comments[0]).to.be.an('object');
    expect(comments[0]).to.haveOwnProperty('parentId');
  });
});

describe('Delete Comment', () => {
  it('should return null if comment does not exist', async () => {
    const existingComment = await commentRepo.getOnlyComment(20);
    expect(existingComment).to.be.deep.equal(null);
  });

  it('should mark a comment as isDeleted', async () => {
    const existingComment = await commentRepo.getOnlyComment(1);
    const deletedComment = await commentRepo.deleteComment(existingComment);

    expect(deletedComment.isDeleted).to.be.deep.equal(true);
  });
});
