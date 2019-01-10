
export function toRad(value) {
  return value * Math.PI / 180;
}

export function getDistanceBetweenPoints(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const lt1 = toRad(lat1);
  const lt2 = toRad(lat2);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2)
    * Math.sin(dLon / 2) * Math.cos(lt1) * Math.cos(lt2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
}
