import followers from '../seedData/followers.data';

export default {
  up: queryInterface => queryInterface.bulkInsert('Followers', followers, {}),
  down: queryInterface => queryInterface.bulkDelete('Followers', null, {})
};
