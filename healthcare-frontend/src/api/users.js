
import axios from '.';

export function getUsers(id) {
  return axios.get(`/users/${id}/patients`);
}

export function assignDoctor(id, doctorId) {
  return axios.put(`/users/${id}/doctor`, { id: doctorId });
}
