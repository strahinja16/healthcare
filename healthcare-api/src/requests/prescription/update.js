
const Joi = require('joi');

module.exports = {
  drug: Joi.string(),
  hours: Joi.number(),
  quantity: Joi.number(),
  note: Joi.string(),
};
