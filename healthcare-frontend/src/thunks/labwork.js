import {
  createLabwork as createLabworkApi,
  getLabworks as getLabworksApi,
  removeLabwork as removeLabworkApi,
} from "../api/labwork";
import {
  createLabwork as createLabworkAction,
  getLabworks as getLabworksAction,
  removeLabwork as removeLabworkAction,
} from "../reducers/labwork";

export function getLabworks(id) {
  return dispatch => getLabworksApi(id)
    .then(({data}) => {
      dispatch(getLabworksAction(data));
    })
    .catch(e => console.log(e));
}

export function createLabwork(file, labwork) {
  return dispatch => createLabworkApi(file, labwork)
    .then(({ data }) => {
      dispatch(createLabworkAction(data));
    })
    .catch(e => console.log(e));
}

export function removeLabwork(id) {
  return dispatch => removeLabworkApi(id)
    .then(({ data }) => {
      dispatch(removeLabworkAction(data));
    })
    .catch(e => console.log(e));
}
