import dotenv from 'dotenv';
import passwordUtil from '../utilities/passwordHasher';

dotenv.config();

const { hash } = passwordUtil;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await hash(process.env.ADMIN_PASSWORD);
    return queryInterface.bulkInsert('Users', [{
      firstName: process.env.ADMIN_FIRSTNAME,
      lastName: process.env.ADMIN_LASTNAME,
      username: process.env.ADMIN_USRERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
