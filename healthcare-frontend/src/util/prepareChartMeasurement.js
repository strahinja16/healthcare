
const switchPressure =  {
  PRESSURE: 'PRESSURE',
  TEMPERATURE: 'TEMPERATURE',
  PULSE: 'PULSE',
  SUGAR: 'SUGAR',
};

export default (data, type) => {
  switch(type){
    case switchPressure.PRESSURE: return preparePressureMeasurements(data);
    case switchPressure.TEMPERATURE: return prepareTemperatureMeasurements(data);
    case switchPressure.PULSE: return preparePulseMeasurements(data);
    case switchPressure.SUGAR: return prepareSugarMeasurements(data);
  }
}

const preparePressureMeasurements = (measurements) => {
  let topList = [];
  let bottomList = [];

  measurements.forEach((item) => {
    const splitted = item.split('/');
    topList.push(parseInt(splitted[0]));
    bottomList.push(parseInt(splitted[1]));
  });

  return {
    data: {
      datasets: [
        {
          label: 'Systolic (top number)',
          backgroundColor: 'rgba(200,10,120,0.2)',
          data: topList,
        },
        {
          label: 'Diastolic (bottom number)',
          backgroundColor: 'rgba(10,100,200,0.5)',
          data: bottomList,
        },
      ], labels: Array.apply(null, {length: measurements.length}).map(Number.call, Number),
    },
    options: {
      tooltips: {
        mode: 'label',
        callbacks: {
          title: function (tooltipItem, data) {
            return 'Recorded at: ' + data.datasets[0].time[tooltipItem[0].index];
          },

        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
          }
        }]
      }
    }
  }
};

const prepareTemperatureMeasurements = (measurements) => ({
  data: {
    datasets: [
      {
        label: 'Temperature ( C )',
        backgroundColor: 'rgba(10,100,200,0.5)',
        data: measurements.map(item => parseInt(item, 10)),
      },
    ], labels: Array.apply(null, {length: measurements.length}).map(Number.call, Number)
  },
  options: {
    tooltips: {
      mode: 'label',
      callbacks: {

        title: function (tooltipItem, data) {
          return 'Recorded at: ' + data.datasets[0].time[tooltipItem[0].index];
        },

      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
        }
      }]
    }
  }
});

const preparePulseMeasurements = (measurements) => ({
  data: {
    datasets: [
      {
        label: 'Pulse beats per minute ( bpm )',
        backgroundColor: 'rgba(200 ,100,100,0.5)',
        data: measurements,
      },
    ], labels: Array.apply(null, {length: measurements.length}).map(Number.call, Number),
  },
  options: {
    tooltips: {
      mode: 'label',
      callbacks: {
        title: function (tooltipItem, data) {
          return 'Recorded at: ' + data.datasets[0].time[tooltipItem[0].index];
        },

      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
        }
      }]
    }
  }
});

const prepareSugarMeasurements = (measurements) => {
  return {
    data: {
      datasets: [
        {
          label: 'Blood sugar level ( mg/dL )',
          backgroundColor: 'rgba(200 ,100,100,0.5)',
          data: measurements,
        },
      ], labels: Array.apply(null, {length: measurements.length}).map(Number.call, Number),
    },
    options: {
      tooltips: {
        mode: 'label',
        callbacks: {

          title: function (tooltipItem, data) {
            return 'Recorded at: ' + data.datasets[0].time[tooltipItem[0].index];
          },

        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false,
          }
        }]
      }
    }
  }
};

