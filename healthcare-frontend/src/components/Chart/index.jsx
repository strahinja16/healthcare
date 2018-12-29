
import React, { Component, Fragment } from 'react';

import { Line } from "react-chartjs-2";
import prepareChartMeasurement from "../../util/prepareChartMeasurement";

class Chart extends Component {
  render() {
    const { data, type } = this.props;
    if (!data) {
      return null;
    }

    const { data: items, options } = prepareChartMeasurement(data, type);

    return (
      <Fragment>
        <Line
          width={300}
          height={300}
          data={items}
          options={options}
        />
      </Fragment>
    );
  }
}

export default Chart;
