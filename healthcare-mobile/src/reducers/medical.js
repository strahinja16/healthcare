
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { GET_PRESCRIPTIONS } from '../consts/actions';

// CREATE ACTIONS
export const getPrescriptions = createAction(GET_PRESCRIPTIONS);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  prescriptions: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [GET_PRESCRIPTIONS](
      state,
      {
        payload: { prescriptions },
      },
    ) {
      return state.merge({
        prescriptions,
      });
    },
  },
  INITIAL_STATE,
);
