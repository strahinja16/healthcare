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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

class Disease extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'diseases',
    });
  }

  static associate(models) {
    this.medicationsAssociation = this.belongsToMany(models.Medication, {
      as: 'Medications',
      through: 'medications-diseases',
      foreignKey: 'diseaseId',
    });
  }
}

module.exports = Disease;
