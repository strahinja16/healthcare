
import { allUsers, newUser } from '../reducers/users';
import { getUsers as getUsersApi, addUsers as addUserApi } from '../api/users';

export function getUsers() {
  return dispatch => getUsersApi()
    .then((response) => {
      const { data } = response;
      
      return {
        data,
      };
    })
    .then(({ data }) => {
      dispatch(allUsers(data));
    });
}

export function addUser(id) {
  return dispatch => addUserApi(id)
    .then((response) => {
      dispatch(newUser(response));
    });
}
