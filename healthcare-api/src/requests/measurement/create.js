
const Joi = require('joi');

module.exports = {
  pressure: Joi.string().allow(null),
  sugar: Joi.string().allow(null),
  temperature: Joi.string().allow(null),
};
