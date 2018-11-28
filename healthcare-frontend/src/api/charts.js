
import axios from '.';

export function getChartData(id) {
  return axios.get(`/users/${id}/measurements`);
}