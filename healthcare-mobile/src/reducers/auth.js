
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { LOGIN_ACTION, LOGOUT_ACTION, LOAD_USER_AND_TOKEN } from '../consts/actions';

// CREATE ACTIONS
export const loginUser = createAction(LOGIN_ACTION);
export const logoutUser = createAction(LOGOUT_ACTION);
export const loadUserAndToken = createAction(LOAD_USER_AND_TOKEN);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  user: {},
  token: null,
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {
    [LOGOUT_ACTION](state) {
      return state.merge(INITIAL_STATE);
    },

    [LOGIN_ACTION](
      state,
      {
        payload: { token, user },
      },
    ) {
      return state.merge({
        user,
        token,
      });
    },

    [LOAD_USER_AND_TOKEN](
      state,
      {
        payload: { token, user },
      },
    ) {
      return state.merge({
        user,
        token,
      });
    },
  },
  INITIAL_STATE,
);
