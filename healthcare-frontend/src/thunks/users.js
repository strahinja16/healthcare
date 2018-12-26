
import { allUsers, newUser } from '../reducers/users';
import { getUsers as getUsersApi, assignDoctor } from '../api/users';

export function getUsers(id) {
  return dispatch => getUsersApi(id)
    .then(({ data }) => {
      dispatch(allUsers(data));
    });
}

export function addUser(lbo, payload) {
  return dispatch => assignDoctor(lbo, payload)
    .then(({ data }) => {
      dispatch(newUser(data));
    });
}
