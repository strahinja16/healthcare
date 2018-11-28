
const faker = require('faker');
const uuid = require('uuid/v4');

const drugs = ['Prednibalamin', 'Alvibyclor', 'Tazarotene', 'Victovatol', 'Monopizole'] ;

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id from users;',
    );
    const userIds = users[0].map(element => element.id);

    const insertData = [];

    const inTenDays = new Date(new Date().getTime() + (86400000 * 10));

    userIds.forEach(userId => {
      for (let i = 0; i < 4; i++) {
        insertData.push({
          id: uuid(),
          userId,
          drug: faker.random.arrayElement(drugs),
          hours: faker.random.number({min:6, max:24}),
          quantity: faker.random.number({min:1, max:3}),
          note: faker.lorem.words(),
          dueDate: inTenDays,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    return queryInterface.bulkInsert('prescriptions', insertData, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('prescriptions', null, {});
  },
};
