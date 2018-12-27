const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

class Medication extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'medications',
    });
  }

  static associate(models) {
    this.sideEffectsAssociation = this.belongsToMany(models.SideEffect, {
      as: 'SideEffects',
      through: 'medications-sideeffects',
      foreignKey: 'medicationId',
    });
    this.diseasesAssociation = this.belongsToMany(models.Disease, {
      as: 'Diseases',
      through: 'medications-diseases',
      foreignKey: 'medicationId',
    });
  }
}

module.exports = Medication;
