import chai from 'chai';
import commentRepo from '../../repository/commentRepository';
import data from '../utilities/mockData';
import userRepo from '../../repository/userRepository';

const { expect } = chai;
const { goodComment, commentHistData, xtremeCassey } = data;
let history, comment;

describe('Create comment', () => {
  before(async () => {
    goodComment.articleId = 1;
    const user = await userRepo.createUser(xtremeCassey);
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
