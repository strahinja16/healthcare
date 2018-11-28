
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
      for (let i = 0; i < 10; i++) {
        insertData.push({
          id: uuid(),
          userId,
          pressure: `${faker.random.number({min:120, max:150})}/${faker.random.number({min:60, max:80})}`,
          sugar: `${faker.random.number({min:70, max:120})} mg/dL`,
          temperature: `${faker.finance.amount(36,39,2)} C`,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    return queryInterface.bulkInsert('measurements', insertData, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('measurements', null, {});
  },
};
