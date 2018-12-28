

import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import {
  GET_ACTIVE_PRESCRIPTIONS_ACTION,
  CREATE_PRESCRIPTION_ACTION,
  GET_DISEASES_ACTION,
  GET_DRUGS_BY_DISEASE_ACTION,
} from '../consts/actions';

// CREATE ACTIONS
export const getActivePrescriptions = createAction(GET_ACTIVE_PRESCRIPTIONS_ACTION);
export const createPrescription = createAction(CREATE_PRESCRIPTION_ACTION);
export const setDiseases = createAction(GET_DISEASES_ACTION);
export const setDrugsByDisease = createAction(GET_DRUGS_BY_DISEASE_ACTION);


// SET INITIAL STATE
const INITIAL_STATE = Map({
  prescriptions: [],
  currentDiseases: [],
  currentMedications: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_ACTIVE_PRESCRIPTIONS_ACTION](state, { payload }) {
      return state.set('prescriptions', payload);
    },
    [GET_DISEASES_ACTION](state, { payload }) {
      return state.set('currentDiseases', payload);
    },
    [GET_DRUGS_BY_DISEASE_ACTION](state, { payload }) {
      return state.set('currentMedications', payload);
    },
    [CREATE_PRESCRIPTION_ACTION](state, { payload }) {
      const prescription = payload;
      const prescriptions = state.get('prescriptions');
      const prescriptionsWithNew = prescriptions.concat(prescription);
      return state.set('prescriptions', prescriptionsWithNew);
    },
  },
  INITIAL_STATE,
);
