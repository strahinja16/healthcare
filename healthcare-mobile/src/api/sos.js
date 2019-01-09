import axios from '.';

export function requestHelp(userId, longitude, latitude) {
  return axios.post('/request-help', {
    coordinates: JSON.stringify({ longitude, latitude }),
    userId,
  });
}
