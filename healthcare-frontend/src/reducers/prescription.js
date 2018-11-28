

import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_ACTIVE_PRESCRIPTIONS_ACTION, CREATE_PRESCRIPTION_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const getActivePrescriptions = createAction(GET_ACTIVE_PRESCRIPTIONS_ACTION);
export const createPrescription = createAction(CREATE_PRESCRIPTION_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  prescriptions: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_ACTIVE_PRESCRIPTIONS_ACTION](state, { payload: { data } }) {
      return state.set('prescriptions', data);
    },
    [CREATE_PRESCRIPTION_ACTION](state, {payload: { data }}) {
      const prescription = data;
      const prescriptions = state.get('prescriptions');
      const prescriptionsWithNew = prescriptions.concat(prescription);
      return state.set('prescriptions', prescriptionsWithNew);
    },
  },
  INITIAL_STATE,
);
