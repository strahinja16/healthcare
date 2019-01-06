
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Label, List, Divider, Button,
} from 'semantic-ui-react';

const Examination = ({ examination: {appointment, showedUp, id, note}, examinationFinished }) => {
  const today = moment().diff(appointment, 'days');
  return (
    <List.Item>
        <Label as="a" color="blue" ribbon>
          Scheduled for {moment(appointment).format('lll')}
        </Label>
        <Divider hidden />
        { today && !showedUp
          ? (
            <Button
              basic
              color="blue"
              onClick={() => examinationFinished(id)}
            >Submit patient arrival ✓
            </Button>
          )
          : null }
        <Divider />
        <List.Description>{note}</List.Description>
    </List.Item>
  );
};

Examination.propTypes = {
  examination: PropTypes.shape({}).isRequired,
  examinationFinished: PropTypes.func.isRequired,
};

export default Examination;
