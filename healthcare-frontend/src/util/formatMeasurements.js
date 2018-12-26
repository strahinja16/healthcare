export default (measurements) => {
  const obj = {
    'Blood pressure': [],
    'Blood temperature': [],
    'Pulse':[],
    Sugar:[],
  };

  measurements.forEach(({ temperature, pressure, sugar, pulse }) => {
    pressure && obj['Blood pressure'].push(pressure);
    temperature && obj['Blood temperature'].push(temperature);
    pulse && obj['Pulse'].push(pulse);
    sugar && obj.Sugar.push(sugar);
  });
  return obj;
};
