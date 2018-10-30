/* eslint no-unused-vars:0 */
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    facebook: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    google: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    twitter: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    role: {
      type: Sequelize.ENUM('user', 'admin'),
      allowNull: false,
    },
    isConfirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    resetToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
