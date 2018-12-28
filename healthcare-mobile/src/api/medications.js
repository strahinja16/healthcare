import axios from '.';

export function getDisease(diseaseName) {
  return axios.get(`/prescriptions/disease/${diseaseName}`);
}

export function getSideEffects(drugName) {
  return axios.get(`/prescriptions/side-effects/${drugName}`);
}
