const Joi = require('joi');

const BLOOD_TYPES = [
  "0+",
  "0-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
];

const genderValues = ['M', 'F'];

module.exports = {
  bloodType: Joi.string().valid(BLOOD_TYPES),
  weight: Joi.number(),
  height: Joi.number(),
  birthday: Joi.date(),
  gender: Joi.string().valid(genderValues),
  emergency: Joi.string(),
};
