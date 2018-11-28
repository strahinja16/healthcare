
import React from 'react';
import PropTypes from 'prop-types';
import {
  List, Button,
} from 'semantic-ui-react';
import style from './style.scss';
import Prescription from '../Prescription';

const PrescriptionList = ({ prescriptions, createPrescription }) => (
  <div className={style.maxWidth}>
    <Button basic color='teal' onClick={createPrescription} content='Add new prescription' fluid />
    <List divided relaxed>
      {
          prescriptions.map(prescription => (
            <Prescription
              key={prescription.id}
              prescription={prescription}
            />
          ))
        }
    </List>
  </div>
);

PrescriptionList.propTypes = {
  prescriptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  createPrescription: PropTypes.func.isRequired,
};

export default PrescriptionList;
