import { AsyncStorage } from 'react-native';
import { loginUser, logoutUser, loadUserAndToken } from '../reducers/auth';
import { login as loginApi } from '../api/auth';

export function logout() {
  return async (dispatch) => {
    dispatch(logoutUser());
    await AsyncStorage.removeItem('_token');
  };
}

export function login(email, password) {
  return dispatch => loginApi(email, password)
    .then((response) => {
      const { data } = response;
      const { token } = data;
      delete data.token;
      return {
        token,
        user: data.user,
      };
    })
    .then(async (payload) => {
      await AsyncStorage.setItem('_token', payload.token);
      await AsyncStorage.setItem('user', JSON.stringify(payload.user));
      dispatch(loginUser(payload));
    });
}

export function loadUserAndTokenFromStorage() {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem('_token');
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    dispatch(loadUserAndToken({ token, user }));
  };
}
