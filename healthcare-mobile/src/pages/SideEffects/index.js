
import React from 'react';
import PropType from 'prop-types';
import SideEffects from '../../components/SideEffects';

const SideEffectsPage = ({ prescription }) => (
  <SideEffects prescription={prescription} />
);

SideEffectsPage.propTypes = {
  prescription: PropType.shape({}).isRequired,
};

export default SideEffectsPage;