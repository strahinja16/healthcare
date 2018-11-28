
import axios from '.';

export function getActivePrescriptions(id) {
  return axios.get(`/users/${id}/prescriptions`);
}

export function createPrescription(payload) {
  return axios.post('/prescriptions', payload);
}
