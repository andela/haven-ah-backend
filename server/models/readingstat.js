export default (sequelize, DataTypes) => {
  const ReadingStat = sequelize.define('ReadingStat', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timeRead: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {});

  return ReadingStat;
};
