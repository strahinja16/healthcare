const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface) => {
    const medicationNames = ['Immuprex', 'Loratamine', 'Penifine', 'Amcicilin', 'Chlorpatch'];
    const sideEffectNames = ['Nausea', 'Rash', 'Vomiting'];
    const diseasesName = [ 'HodginksLymphoma', 'Adenovirus', 'Hiv'];

    const medicationIds = [ uuid(), uuid(), uuid(), uuid(), uuid()];
    const sideEffectIds = [ uuid(), uuid(), uuid()];
    const diseaseIds = [ uuid(), uuid(), uuid()];

    let medications = [];
    let diseases = [];
    let sideEffects = [];

    for(let i = 0; i < 5; i++) {
      medications.push({
        id: medicationIds[i],
        name: medicationNames[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for(let i = 0; i < 3; i++) {
      diseases.push({
        id: diseaseIds[i],
        name: diseasesName[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for(let i = 0; i < 3; i++) {
      sideEffects.push({
        id: sideEffectIds[i],
        description: sideEffectNames[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('medications', medications, {});
    await queryInterface.bulkInsert('sideeffects', sideEffects, {});
    await queryInterface.bulkInsert('diseases', diseases, {});

  },

  down: async (queryInterface)  => {
    await queryInterface.bulkDelete('medications', null, {});
    await queryInterface.bulkDelete('sideeffects', null, {});
    await queryInterface.bulkDelete('diseases', null, {});
  }
};