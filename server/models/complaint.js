export default (sequelize, DataTypes) => {
  const Complaint = sequelize.define('Complaint', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    complaintType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['Rules Violation', 'Abuse', 'Plagiarism']
    },
    complaintBody: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});

  Complaint.associate = (models) => {
    Complaint.belongsTo(models.Articles, {
      as: 'Complaints',
      foreignKey: 'articleId'
    });

    Complaint.belongsTo(models.User, {
      as: 'Complainer',
      foreignKey: 'userId'
    });
  };
  return Complaint;
};
