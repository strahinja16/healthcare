

import { Map } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import {GET_EXAMINATIONS_ACTION, EXAMINATION_FINISHED_ACTION, CREATE_EXAMINATION_ACTION} from '../consts/actions';

// CREATE ACTIONS
export const getExaminations = createAction(GET_EXAMINATIONS_ACTION);
export const examinationFinished = createAction(EXAMINATION_FINISHED_ACTION);
export const createExamination = createAction(CREATE_EXAMINATION_ACTION);


// SET INITIAL STATE
const INITIAL_STATE = Map({
  examinations: [],
});

// WRITE HANDLERS FOR ACTIONS
export default handleActions(
  {

    [GET_EXAMINATIONS_ACTION](state, { payload: { data } }) {
      return state.set('examinations', data);
    },
    [EXAMINATION_FINISHED_ACTION](state, { payload }) {

      const examinations = state.get('examinations');

      const editedExaminations = examinations.map((examination) => {
        if (examination.id === payload) {
          examination.showed = true;
        }
        return examination;
      });

      return state.set('examinations', editedExaminations);
    },
    [CREATE_EXAMINATION_ACTION](state, {payload: { data }}) {
      const examination = data;
      const examinations = state.get('examinations');
      const examinationsWithNew = examinations.concat(examination);
      return state.set('examinations', examinationsWithNew);
    },
  },
  INITIAL_STATE,
);
