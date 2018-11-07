/**
 * Function for nesting replies to each comment
 * @param {array} dbComments raw comment array from the DB
 * @param {integer} currParentId
 * @returns {object} the comment object with nested replies.
 */
const addReplies = (dbComments, currParentId) => {
  if (currParentId === 0) {
    return dbComments.filter(element => element.parentId === null);
  }
  const comment = dbComments.filter(element => element.id === currParentId);
  const replies = dbComments.filter(element => element.parentId === currParentId);
  if (comment.length > 0) {
    comment[0].Replies = replies;
    return comment;
  }
};

export default addReplies;
