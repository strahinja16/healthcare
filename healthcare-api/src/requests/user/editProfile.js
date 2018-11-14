const Joi = require('joi');

module.exports = {
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
};
