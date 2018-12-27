
import React from 'react';
import PropType from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../thunks/auth';
import MeasureParameter from '../../components/MesureParameter';

const Measurements = ({ user }) => (
  <MeasureParameter user={user} />
);

Measurements.propTypes = {
  user: PropType.shape({}).isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.get('user'),
})

export default connect(mapStateToProps)(Measurements);