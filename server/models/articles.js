export default (sequelize, DataTypes) => {
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
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
    }
  }, {});

  Articles.associate = (models) => {
    Articles.hasMany(models.ArticleTag, {
      foreignKey: 'articleId',
      as: 'articleTag'
    });
    Articles.hasMany(models.Ratings, {
      foreignKey: 'articleId'
    });

    Articles.belongsTo(models.User, {
      foreignKey: 'userid',
      as: 'Author'
    });

    Articles.belongsToMany(models.Tags, {
      as: 'Tags',
      through: 'ArticleTag',
      foreignKey: 'articleId'
    });

    Articles.hasMany(models.Complaint, {
      as: 'Complaints',
      foreignKey: 'articleId'
    });

    Articles.hasMany(models.Reaction, {
      foreignKey: 'articleId',
      as: 'Reactions',
    });

    Articles.belongsToMany(models.User, {
      as: 'Readers',
      foreignKey: 'articleId',
      through: 'ReadingStat',
    });

    Articles.hasMany(models.Comment, {
      foreignKey: 'articleId',
      as: 'Comments',
    });
  };
  return Articles;
};
