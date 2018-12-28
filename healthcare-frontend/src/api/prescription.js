
import fetch from '.';
import axios from 'axios';

export function getActivePrescriptions(id) {
  return fetch.get(`/users/${id}/prescriptions`);
}

export function createPrescription(payload) {
  return fetch.post('/prescriptions', payload);
}

export function getDiseases(like) {
  return axios.get(`http://localhost:3002/api/diseases/search/${like}`);
}

export function getDrugsByDisease(name) {
  return axios.get(`http://localhost:3002/api/diseases/${name}/medications`);
}
