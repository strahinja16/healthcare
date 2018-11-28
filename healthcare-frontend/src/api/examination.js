
import axios from '.';

export function getExaminations(id) {
  return axios.get(`/users/${id}/examinations`);
}

export function examinationFinished(id) {
  return axios.put(`/examinations/${id}`);
}

export function createExamination(payload) {
  return axios.post('/examinations', payload);
}
