
const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  showed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  appointment: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};

class Examination extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'examinations',
    });
  }

  static associate(models) {
    this.userAssociation = this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }
}

module.exports = Examination;
