
import React, { Component, Fragment } from 'react';
import {
  Label, List, Divider,
} from 'semantic-ui-react';
import { Line, HorizontalBar } from "react-chartjs-2";

class Charts extends Component {
  constructor(props) {
    super(props);

    this.generateBloodPressureData = this.generateBloodPressureData.bind(this);
    this.generateBloodSugarData = this.generateBloodSugarData.bind(this);
  }

  generateBloodSugarData(dataArray) {

    let valueList = [];
    let timeList = [];
    let labelList = [];

    dataArray.forEach((item, index) => {
      valueList.push(item.value);
      timeList.push(item.time);
      labelList.push(index);
    });

    return {
      data: {
        datasets: [
          {
            label: 'Blood sugar level ( mg/dL )',
            backgroundColor: 'rgba(200 ,100,100,0.5)',
            data: valueList,
            time: timeList,
          },
        ], labels: labelList
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
              beginAtZero: true
            }
          }]
        }
      }
    }
  }

  generateBloodPressureData(dataArray) {

    let topList = [];
    let bottomList = [];
    let timeList = [];
    let labelList = [];

    dataArray.forEach((item, index) => {
      let tmpValue = item.value.split('/');
      topList.push(parseInt(tmpValue[0]));
      bottomList.push(parseInt(tmpValue[1]));
      timeList.push(item.time);
      labelList.push(index);
    });

    return {
      data: {
        datasets: [
          {
            label: 'Diastolic (bottom number)',
            backgroundColor: 'rgba(10,100,200,0.5)',
            data: bottomList,
            time: timeList,
          },
          {
            label: 'Systolic (top number)',
            backgroundColor: 'rgba(200,10,120,0.2)',
            data: topList,
          }
        ], labels: labelList
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
              beginAtZero: true
            }
          }]
        }
      }
    }
  }

  generateTempData(dataArray) {

    let val = [];
    let timeList = [];
    let labelList = [];

    dataArray.forEach((item, index) => {
      val.push(parseInt(item.value));
      timeList.push(item.time);
      labelList.push(index);
    });

    return {
      data: {
        datasets: [
          {
            label: 'Temperature ( C )',
            backgroundColor: 'rgba(10,100,200,0.5)',
            data: val,
            time: timeList,
          },
        ], labels: labelList
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
              beginAtZero: true
            }
          }]
        }
      }
    }
  }


  render() {
    const { data, type } = this.props;
    if (!data) {
      return null;
    }
    let values;
    if (type === 0)
      values = this.generateBloodPressureData(data);
    else if (type === 1)
      values = this.generateBloodSugarData(data);
    else if (type === 2)
      values = this.generateTempData(data);

    return (
      <Fragment>
        <Line
          width={300}
          height={300}
          data={values.data}
          options={values.options}
        />
      </Fragment>
    );
  }
}

export default Charts;
