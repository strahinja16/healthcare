
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_CHART_DATA_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getCharts = createAction(GET_CHART_DATA_ACTION);

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
  },
  INITIAL_STATE,
);
