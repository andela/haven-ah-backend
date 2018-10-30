/* eslint no-unused-vars:0 */


module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define('Articles', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    readtime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Articles.associate = (models) => {
    Articles.belongsTo(models.User, {
      foreignKey: 'userid',
    });
  };
  return Articles;
};
