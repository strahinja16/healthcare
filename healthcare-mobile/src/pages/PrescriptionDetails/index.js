
import React from 'react';
import PropType from 'prop-types';
import PrescriptionDetails from '../../components/PrescriptionDetails';

const PrescriptionDetailsPage = ({ perscription }) => (
  <PrescriptionDetails perscription={perscription} />
);

PrescriptionDetailsPage.propTypes = {
  perscription: PropType.shape({}).isRequired,
};

export default PrescriptionDetailsPage;