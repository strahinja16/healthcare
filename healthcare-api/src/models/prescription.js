
const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  drug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hours: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
};

class Prescription extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'prescriptions',
    });
  }

  static associate(models) {
    this.userAssociation = this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }
}

module.exports = Prescription;
