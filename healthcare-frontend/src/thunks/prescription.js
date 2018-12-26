
import {
  getActivePrescriptions as getActivePrescriptionsAction,
  createPrescription as createPrescriptionAction,
} from '../reducers/prescription';
import {
  getActivePrescriptions as getActivePrescriptionsApi,
  createPrescription as createPrescriptionApi,
} from '../api/prescription';

export function getActivePrescriptions(id) {
  return dispatch => getActivePrescriptionsApi(id)
    .then(({ data }) => {
      dispatch(getActivePrescriptionsAction(data));
    })
    .catch(e => console.log(e));
}

export function createPrescription(payload) {
  return dispatch => createPrescriptionApi(payload)
    .then(({ data }) => {
      dispatch(createPrescriptionAction(data));
    })
    .catch(e => console.log(e));
}
