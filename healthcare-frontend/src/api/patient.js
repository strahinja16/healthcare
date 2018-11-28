
import axios from '.';

export function getPatient(id) {
  return axios.get(`/users/${id}`);
}
