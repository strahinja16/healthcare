
const Joi = require('joi');

module.exports = {
  userId: Joi.string().required(),
  note: Joi.string().required(),
};
