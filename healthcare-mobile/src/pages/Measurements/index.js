
import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import MeasureParameter from '../../components/MesureParameter';

const MeasurementsPage = ({ user }) => (
  <MeasureParameter user={user} />
);

MeasurementsPage.propTypes = {
  user: PropType.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.get('user'),
})

export default connect(mapStateToProps)(MeasurementsPage);