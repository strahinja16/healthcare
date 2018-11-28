

import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_PATIENT_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getPatient = createAction(GET_PATIENT_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  patient: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_PATIENT_ACTION](state, { payload: { data } }) {
      return state.set('patient', data);
    },

  },
  INITIAL_STATE,
);
