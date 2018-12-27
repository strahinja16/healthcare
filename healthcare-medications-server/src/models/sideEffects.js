const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

class SideEffect extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'sideeffects',
    });
  }

  static associate(models) {
    this.medicationsAssociation = this.belongsToMany(models.Medication, {
      as: 'Medications',
      through: 'medications-sideeffects',
      foreignKey: 'sideeffectId',
    });
  }
}

module.exports = SideEffect;

