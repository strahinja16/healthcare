
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import {ADD_CHART_DATA_ACTION, GET_CHART_DATA_ACTION} from '../consts/actions';

// CREATE ACTIONS
export const getCharts = createAction(GET_CHART_DATA_ACTION);
export const addMeasurement = createAction(ADD_CHART_DATA_ACTION);


// SET INITIAL STATE
const INITIAL_STATE = Map({
    charts: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_CHART_DATA_ACTION](state, { payload }) {
        return state.set("charts", {
         'Blood pressure': payload['Blood pressure'],
         'Blood temperature': payload['Blood temperature'],
         'Pulse': payload['Pulse'],
         Sugar: payload.Sugar,
        });
    },
    [ADD_CHART_DATA_ACTION](state, { payload: { temperature, pressure, sugar, pulse } }) {
      const temperatures = state.get('charts')['Blood temperature'];
      const sugars = state.get('charts')['Sugar'];
      const pressures = state.get('charts')['Blood pressure'];
      const pulses = state.get('charts')['Pulse'];

      temperature  && temperatures.push(temperature);
      pressure && pressures.push(pressure);
      sugar && sugars.push(sugar);
      pulse && pulses.push(pulse);

      return state.set("charts", {
        'Blood pressure': pressures,
        'Blood temperature': temperatures,
        'Pulse': pulses,
        Sugar: sugars,
      });
    },
  },
  INITIAL_STATE,
);
