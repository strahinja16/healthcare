
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_SUGAR_PRESURE_DATA_ACTION, GET_SUGAR_CHART_DATA_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getPresurChartDataAction = createAction(GET_SUGAR_PRESURE_DATA_ACTION);
export const getSugarChartDataAction = createAction(GET_SUGAR_CHART_DATA_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
    charts: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_SUGAR_PRESURE_DATA_ACTION](state, { payload: { data } }) {
        let pressure = [];
        let sugar = [];
        let temperature = [];

        data.forEach(element => {
            let time = element.createdAt;
            if(element.pressure)
                pressure.push({value: element.pressure, time: time});
            if(element.sugar)
                sugar.push({value: element.sugar.split(' ')[0], time: time});
            if(element.temperature)
                temperature.push({value: element.temperature.split(' ')[0], time: time});
        });
        return state.set("charts", {
            pressure: pressure,
            sugar: sugar,
            temperature: temperature
        });
    },

    [GET_SUGAR_CHART_DATA_ACTION](state, { payload: { data } }) {
        return state.set("sugerChart", data);
      },

  },
  INITIAL_STATE,
);
