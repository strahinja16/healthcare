
import React from 'react';
import PropType from 'prop-types';
import Disease from '../../components/Disease';

const DiseasePage = ({ prescription }) => (
  <Disease prescription={prescription} />
);

DiseasePage.propTypes = {
  prescription: PropType.shape({}).isRequired,
};

export default DiseasePage;