import axios from '.';

export function editProfile(id, bloodType, height, weight, birthday, gender, lbo) {
  return axios.put(`/users/${id}`, {
    bloodType,
    height,
    weight,
    birthday,
    gender,
    lbo,
  });
}

export function getPrescriptions(id) {
  return axios.get(`/users/${id}/prescriptions`);
}
