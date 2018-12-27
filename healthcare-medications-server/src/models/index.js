const Sequelize = require('sequelize');
const sequelize = require('../services/db');
const DiseaseModel = require('./disease');
const SideEffectModel = require('./sideEffects');
const MedicationModel = require('./medication');


const models = {
  Disease: DiseaseModel.init(sequelize, Sequelize),
  SideEffect: SideEffectModel.init(sequelize, Sequelize),
  Medication: MedicationModel.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
