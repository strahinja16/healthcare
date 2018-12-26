
import {
  getExaminations as getExaminationsAction,
  examinationFinished as examinationFinishedAction,
  createExamination as createExaminationAction,
} from '../reducers/examination';
import {
  getExaminations as getExaminationsApi,
  examinationFinished as examinationFinishedApi,
  createExamination as createExaminationApi,
} from '../api/examination';

export function getExaminations(id) {
  return dispatch => getExaminationsApi(id)
    .then(({ data }) => {
      dispatch(getExaminationsAction(data));
    })
    .catch(e => console.log(e));
}

export function examinationFinished(id) {
  return dispatch => examinationFinishedApi(id)
    .then(({ data }) => {
      dispatch(createExaminationAction(data));
    })
    .catch(e => console.log(e));
}

export function createExamination(payload) {
  return dispatch => createExaminationApi(payload)
    .then(({ data }) => {
      dispatch(createExaminationAction(data));
    })
    .catch(e => console.log(e));
}
