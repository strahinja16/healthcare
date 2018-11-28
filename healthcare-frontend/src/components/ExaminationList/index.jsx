
import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Button,
} from 'semantic-ui-react';
import style from './style.scss';
import Examination from '../Examination';

const ExaminationList = ({ examinations, examinationFinished, createExamination }) => (
  <div className={style.maxWidth}>
    <Button
      basic
      color="orange"
      onClick={createExamination}
      content="Schedule an appointment"
      fluid
    />
    <List divided relaxed>
      {
        examinations.map(examination => (
          <Examination
            key={examination.id}
            examination={examination}
            examinationFinished={examinationFinished}
          />
        ))
      }
    </List>
  </div>
);

ExaminationList.propTypes = {
  examinations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  examinationFinished: PropTypes.func.isRequired,
  createExamination: PropTypes.func.isRequired,
};

export default ExaminationList;
