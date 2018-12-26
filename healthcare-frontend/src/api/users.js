
import axios from '.';

export function getUsers(id) {
  return axios.get(`/users/${id}/patients`);
}

export function assignDoctor(lbo, doctorId) {
  return axios.put(`/users/${lbo}/doctor`, { id: doctorId });
}
