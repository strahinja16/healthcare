
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { REQUESTED_HELP } from '../consts/actions';

// CREATE ACTIONS
export const requestedHelp = createAction(REQUESTED_HELP);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  coordinates: null,
  channel: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [REQUESTED_HELP](
      state,
      {
        payload: { coordinates, channel },
      },
    ) {
      return state.merge({
        coordinates,
        channel,
      });
    },
  },
  INITIAL_STATE,
);
