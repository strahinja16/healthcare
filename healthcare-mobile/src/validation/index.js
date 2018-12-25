import validatejs from 'validate.js';
import { capitalizeFirstLetter } from '../util/extractErrorMessagesFromResponse';

export default function validate(object, schema) {
  const formValues = {};

  Object.keys(schema).forEach((key) => {
    formValues[key] = Object.prototype.hasOwnProperty.call(object, key) ? object[key] : null;
  });

  const result = validatejs(formValues, schema, { fullMessages: false });

  if (result) {
    return capitalizeFirstLetter(`${Object.keys(result)[0]} ${Object.values(result)[0]}`);
  }

  return null;
}
