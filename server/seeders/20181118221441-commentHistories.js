import commentHistories from '../seedData/commentHistories.data';

export default {
  up: queryInterface => queryInterface.bulkInsert('CommentHistories', commentHistories, {}),
  down: queryInterface => queryInterface.bulkDelete('CommentHistories', null, {})
};
