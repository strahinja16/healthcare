
import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Label, List, Divider,
} from 'semantic-ui-react';

const Prescription = ({ prescription: { drug, hours, note, dueDate} }) => (
  <List.Item>
    <Fragment>
      <Label as="a" color="teal" ribbon>
       Due {moment(dueDate).format('lll')}
      </Label>
      <Divider hidden />
      <Divider hidden />
      <List.Icon name="pills" /><strong>{drug}</strong> every <strong>{hours}h</strong>
      <Divider hidden />
      <List.Description>{note}</List.Description>
    </Fragment>
  </List.Item>
);

Prescription.propTypes = {
  prescription: PropTypes.shape({}).isRequired,
};

export default Prescription;
