import axios from '.';

export function requestHelp(userId, longitude, latitude, channel) {
  return axios.post('/request-help', {
    coordinates: JSON.stringify({ longitude, latitude }),
    userId,
    channel,
  });
}

export function confirmHelp(distance, duration, channel) {
  return axios.post('/request-help/confirm-help', {
    distance,
    duration,
    channel,
  });
}
