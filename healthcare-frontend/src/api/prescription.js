
import axios from '.';

export function getActivePrescriptions(id) {
  return axios.get(`/users/${id}/prescriptions`);
}

export function createPrescription(payload) {
  return axios.post('/prescriptions', payload);
}

export function getDiseases(like) {
  return axios.get(`/prescriptions/disease/search/${like}`);
}

export function getDrugsByDisease(name) {
  return axios.get(`/prescriptions/disease/${name}/medications`);
}
