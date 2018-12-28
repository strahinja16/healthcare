import axios from './api2';

export function getDisease(diseaseName) {
  return axios.get(`/diseases/${diseaseName}`);
}

export function getSideEffects(drugName) {
  return axios.get(`/side-effects/${drugName}`);
}
