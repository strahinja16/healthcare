import axios from '.';
import formAxios from './formAxios';

export function createLabwork(file, { analysis, userId }) {
  const data = new FormData();
  data.append('file', file);
  data.append('analysis', analysis);
  data.append('userId', userId);

  return formAxios.post('/labworks', data);
}

export function getLabworks(id) {
  return axios.get(`users/${id}/labworks`);
}

export function downloadLabwork(id) {
  return axios.get(`labworks/${id}/file`);
}


export function removeLabwork(id) {
  return axios.delete(`labworks/${id}`);
}
