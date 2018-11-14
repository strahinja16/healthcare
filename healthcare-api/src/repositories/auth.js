const { PasswordRecovery, User } = require('models');

const getPasswordRecoveryWithUser = async token => PasswordRecovery.findOne({
  where: {
    token,
  },
  include: [
    {
      model: User,
    },
  ],
  raw: true,
  nest: true,
});

module.exports = {
  getPasswordRecoveryWithUser,
};
