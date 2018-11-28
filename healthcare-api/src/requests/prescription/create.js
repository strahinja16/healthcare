
const Joi = require('joi');

module.exports = {
  userId: Joi.string().required(),
  drug: Joi.string().required(),
  hours: Joi.number().required(),
  quantity: Joi.number().required(),
  note: Joi.string().required(),
};
