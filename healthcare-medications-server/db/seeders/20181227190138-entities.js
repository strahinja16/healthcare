const uuid = require('uuid/v4');
const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const medicationNames = ['Abarelix', 'Benzagel', 'Bosentan', 'Cedax', 'Celecoxib', 'Daptacel', 'Dactinomycin', 'Efudex', 'Fenofibrate', 'Kapidex'];
    const sideEffectNames = ['Nausea', 'Rash', 'Vomiting'];
    const diseasesName = ['Arthritis', 'Asthma', 'Bronchitis', 'Cancer', 'Diabetes', 'Hypertension', 'Hyperthermia', 'Flu', 'Malaria', 'Thrombosis'];

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
        description: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for(let i = 0; i < 3; i++) {
      diseases.push({
        id: diseaseIds[i],
        name: diseasesName[i],
        description: faker.lorem.sentence(),
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
