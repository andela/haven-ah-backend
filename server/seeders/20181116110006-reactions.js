import reactions from '../seedData/reactions.data';

export default {
  up: queryInterface => queryInterface.bulkInsert('Reactions', reactions, {}),
  down: queryInterface => queryInterface.bulkDelete('Reactions', null, {})
};
