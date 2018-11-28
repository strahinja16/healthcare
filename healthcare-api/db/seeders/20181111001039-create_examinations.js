
const faker = require('faker');
const uuid = require('uuid/v4');

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
          showed: false,
          note: faker.lorem.words(),
          appointment: Math.random() > 0.5 ? inTenDays: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    return queryInterface.bulkInsert('examinations', insertData, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('examinations', null, {});
  },
};
