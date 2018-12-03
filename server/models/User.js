export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    google: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: true,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    allowNotifications: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isFeaturedAuthor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Articles, {
      foreignKey: 'userid',
      as: 'article',
      onDelete: 'CASCADE',
    });

    User.belongsToMany(models.User, {
      as: 'Followers',
      through: 'Follower',
      foreignKey: 'userId'
    });

    User.belongsToMany(models.User, {
      as: 'Followings',
      through: 'Follower',
      foreignKey: 'followerId'
    });

    User.belongsToMany(models.Articles, {
      as: 'ReadArticles',
      foreignKey: 'userId',
      through: 'ReadingStat',
    });

    User.hasMany(models.Complaint, {
      as: 'Complaints',
      foreignKey: 'userId',
    });
  };
  return User;
};
