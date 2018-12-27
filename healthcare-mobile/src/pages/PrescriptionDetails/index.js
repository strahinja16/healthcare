
import React from 'react';
import PropType from 'prop-types';
import PrescriptionDetails from '../../components/PrescriptionDetails';

const PrescriptionDetailsPage = ({ prescription }) => (
  <PrescriptionDetails prescription={prescription} />
);

PrescriptionDetailsPage.propTypes = {
  prescription: PropType.shape({}).isRequired,
};

export default PrescriptionDetailsPage;