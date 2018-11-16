import comments from '../seedData/comments.data';

export default{
  up: queryInterface => queryInterface.bulkInsert('Comments', comments, {}),
  down: queryInterface => queryInterface.bulkDelete('Comments', null, {})
};
