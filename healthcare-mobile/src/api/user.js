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