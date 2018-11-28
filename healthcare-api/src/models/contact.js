
const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  number: {
    type: Sequelize.STRING,
    defaultValue: false,
  },
};

class Contact extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'contacts',
    });
  }

  static associate(models) {
    this.userAssociation = this.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }
}

module.exports = Contact;
