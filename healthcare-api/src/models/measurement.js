
const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  pressure: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  sugar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  temperature: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};

class Measurement extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'measurements',
    });
  }

  static associate(models) {
    this.userAssociation = this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }
}

module.exports = Measurement;
