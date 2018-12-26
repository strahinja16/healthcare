
import { getPatient as getPatientAction } from '../reducers/patient';
import { getPatient as getPatientApi } from '../api/patient';

export function getPatient(id) {
  return dispatch => getPatientApi(id)
    .then(({ data }) => {
      dispatch(getPatientAction(data));
    })
    .catch(e => console.log(e));
}
