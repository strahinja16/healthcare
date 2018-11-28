
import axios from '.';

export function getUsers() {
  return axios.get('/users');
}

export function addUsers(id) {
  return axios.post(`/users/${id}/doctor`);
}
