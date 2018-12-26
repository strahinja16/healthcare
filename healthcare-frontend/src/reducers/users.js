
import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { HOME_ALL_USERS_ACTION, HOME_NEW_USER_ACTION } from '../consts/actions';

// CREATE ACTIONS
export const allUsers = createAction(HOME_ALL_USERS_ACTION);
export const newUser = createAction(HOME_NEW_USER_ACTION);

// SET INITIAL STATE
const INITIAL_STATE = Map({
  users: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [HOME_ALL_USERS_ACTION](state, { payload }) {
      return state.set("users", payload);
    },

    [HOME_NEW_USER_ACTION](state, payload) {
      const usr = payload.payload.data.data;
      const newList = state.get('users');
      const ret = newList.concat(usr);
      return state.set("users", ret);
    },

  },
  INITIAL_STATE,
);
