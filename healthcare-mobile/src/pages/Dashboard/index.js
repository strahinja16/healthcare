
import React from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import Dashboard from '../../components/Dashboard';

const DashboardPage = ({ user, preview }) => (
  <Dashboard user={user} preview={preview} />
);

DashboardPage.defaultProps = {
  preview: false,
};

DashboardPage.propTypes = {
  user: PropType.shape({}).isRequired,
  preview: PropType.bool.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  user: auth.get('user'),
});

export default connect(mapStateToProps)(DashboardPage);