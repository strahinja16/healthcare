
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../thunks/auth';
import Login from '../../components/Login';

const LoginPage = ({ loginAction }) => (
  <Login loginAction={loginAction} />
);

LoginPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loginAction: login,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(LoginPage);