
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Label, List, Divider,
} from 'semantic-ui-react';

const Prescription = ({ prescription: { drug, hoursFrequency, note, dueDate, quantity} }) => (
  <List.Item>
      <Label as="a" color="teal" ribbon>
       Due {moment(dueDate).format('lll')}
      </Label>
      <Divider hidden />
      <Divider hidden />
      <List.Icon name="pills" />
      <strong>{drug}</strong>.  <strong>{quantity}</strong> {quantity > 1 ? 'pills': 'pill'} every
        <strong> {hoursFrequency}h</strong>
      <Divider hidden />
      <List.Description>{note}</List.Description>
  </List.Item>
);

Prescription.propTypes = {
  prescription: PropTypes.shape({}).isRequired,
};

export default Prescription;
