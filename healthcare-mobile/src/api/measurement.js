import axios from '.';

export function postMeasurements(userId, pressure, pulse, temperature, sugar) {
  return axios.post(`/measurements`, {
    userId,
    pressure,
    pulse,
    sugar,
    temperature,
  });
}