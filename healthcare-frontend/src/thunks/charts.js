import { getPresurChartDataAction, getSugarChartDataAction } from '../reducers/charts';
import { getChartData as getChartDataApi } from '../api/charts';

export function getPresureData(id) {
  return dispatch => getChartDataApi(id)
    .then((response) => {
      const { data } = response;
      return {
        data,
      };
    })
    .then(({ data }) => {
      dispatch(getPresurChartDataAction(data));
    });
}
