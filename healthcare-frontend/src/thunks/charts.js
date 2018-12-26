import { getCharts } from '../reducers/charts';
import { getChartData as getChartDataApi } from '../api/charts';
import formatMeasurements from "../util/formatMeasurements";

export function getMeasurements(id) {
  return dispatch => getChartDataApi(id)
    .then(({ data }) => {
      dispatch(getCharts(formatMeasurements(data)));
    });
}
