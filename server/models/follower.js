export default (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});


  return Follower;
};
