
import {
  getActivePrescriptions as getActivePrescriptionsAction,
  createPrescription as createPrescriptionAction,
  setDiseases,
  setDrugsByDisease,
} from '../reducers/prescription';
import {
  getActivePrescriptions as getActivePrescriptionsApi,
  createPrescription as createPrescriptionApi,
  getDiseases as getDiseaseApi,
  getDrugsByDisease as getDrugsByDiseaseApi,
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

export function getDiseases(payload) {
  return dispatch => getDiseaseApi(payload)
    .then(({ data }) => {
      dispatch(setDiseases(data));
    })
    .catch(e => console.log(e));
}

export function getDrugsByDisease(payload) {
  return dispatch => getDrugsByDiseaseApi(payload)
    .then(({ data }) => {
      dispatch(setDrugsByDisease(data));
    })
    .catch(e => console.log(e));
}
