

import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import {GET_LABWORKS_ACTION, CREATE_LABWORK_ACTION, REMOVE_LABWORK_ACTION} from '../consts/actions';

// CREATE ACTIONS
export const getLabworks = createAction(GET_LABWORKS_ACTION);
export const createLabwork = createAction(CREATE_LABWORK_ACTION);
export const removeLabwork = createAction(REMOVE_LABWORK_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  labworks: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_LABWORKS_ACTION](state, { payload }) {
      return state.set('labworks', payload);
    },
    [CREATE_LABWORK_ACTION](state, { payload }) {
      const labwork = payload;
      const labworks = state.get('labworks');
      const labworksWithNew = labworks.concat(labwork);
      return state.set('labworks', labworksWithNew);
    },

    [REMOVE_LABWORK_ACTION](state, { payload }) {
      const labworks = state.get('labworks');
      const filteredLabworks = labworks.filter(labwork => labwork.id !== payload);
      return state.set('labworks', filteredLabworks);
    },
  },
  INITIAL_STATE,
);
