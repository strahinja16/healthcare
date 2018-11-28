
const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  location: {
    type: Sequelize.STRING,
    defaultValue: false,
  },
};

class Panic extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'panics',
    });
  }

  static associate(models) {
    this.userAssociation = this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }
}

module.exports = Panic;
