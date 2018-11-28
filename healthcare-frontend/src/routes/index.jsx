import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import Loadable from 'react-loadable';
import AppLayout from '../components/AppLayout';
import Home from '../pages/Home';
import Patient from '../pages/Patient';
import CreatePrescriptionPage from '../pages/CreatePrescriptionPage';
import CreateExaminationPage from '../pages/CreateExaminationPage';
import Charts from '../pages/Charts';

const dynamicImport = loader =>
  Loadable({
    loader,
    loading: () => <Loader active inline="centered" />,
  });

const AdminRoutes = () => <Route path="/admin" render={() => 'Admin route'} />;

const LoggedInList = ({ isAdmin }) => (
  <Switch>
    <Route exact path="/patient/:id" component={Patient} />
    <Route exact path="/patient/:id/prescription" component={CreatePrescriptionPage} />
    <Route exact path="/patient/:id/examination" component={CreateExaminationPage} />
    <Route exact path="/patient/:id/charts" component={Charts} />
    <Route path="/logout" component={dynamicImport(() => import('../components/Logout'))} />
    <Route path="/" component={Home} />
    {isAdmin && <AdminRoutes />}
    <Redirect to="/" />
  </Switch>
);

LoggedInList.propTypes = {
  isAdmin: PropTypes.bool,
};

LoggedInList.defaultProps = {
  isAdmin: false,
};

const LoggedOutList = () => (
  <Switch>
    <Route exact path="/login" component={dynamicImport(() => import('../pages/Login'))} />
    <Route exact path="/register" component={dynamicImport(() => import('../pages/Register'))} />
    <Route
      exact
      path="/forgot-password"
      component={dynamicImport(() => import('../pages/ForgotPassword'))}
    />
    <Route
      path="/reset-password/:token"
      component={dynamicImport(() => import('../pages/ResetPassword'))}
    />
    <Redirect to="/login" />
  </Switch>
);

const Routes = ({ isLoggedIn, isAdmin }) => (
  <AppLayout isLoggedIn={isLoggedIn} isAdmin={isAdmin}>
    {isLoggedIn ? <LoggedInList isAdmin={isAdmin} /> : <LoggedOutList />}
  </AppLayout>
);

Routes.propTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

Routes.defaultProps = {
  isLoggedIn: null,
  isAdmin: false,
};

const mapStateToProps = ({ auth }) => ({
  isAdmin: auth.getIn(['user', 'isAdmin']),
  isLoggedIn: !!auth.get('token'),
});

export default withRouter(connect(mapStateToProps)(Routes));
