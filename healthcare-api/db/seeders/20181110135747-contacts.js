
const faker = require('faker');
const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id from users;',
    );
    const userIds = users[0].map(element => element.id);

    const insertData = [];

    userIds.forEach(userId => {
      for (let i = 0; i < 2; i++) {
        insertData.push({
          id: uuid(),
          userId,
          number: faker.phone.phoneNumberFormat(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    return queryInterface.bulkInsert('contacts', insertData, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('contacts', null, {});
  },
};
