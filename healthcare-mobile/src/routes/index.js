import React, { Component } from 'react';
import {
  Stack, Scene, Router, Actions,
} from 'react-native-router-flux';
import { Alert, BackHandler } from 'react-native';
import LoadingPage from '../pages/Loading';
import RegisterForm from '../components/Register';
import LoginPage from '../pages/Login';
import DashboardPage from '../pages/Dashboard';
import EditProfilePage from '../pages/EditProfile';
import MeasurementsPage from '../pages/Measurements';
import PrescriptionsPage from '../pages/Prescriptions';
import PrescriptionDetailsPage from '../pages/PrescriptionDetails';
import DiseasePage from '../pages/Disease';
import SideEffectsPage from '../pages/SideEffects';
import ForgotPassword from '../components/ForgotPassword';
import Map from '../components/Map';

const styles = {
  scenesStyle: {
    backgroundColor: '#f2f2f2',
  },
  titleStyle: {
    color: '#fff',
    fontSize: 30,
  },
  headerTintColor: '#fff'
};

class RouterComponent extends Component {
  handleBackPress() {
    this.funcName = 'handleBackPress';
    if (Actions.state.routes.length === 1 && Actions.state.routes[0].routes.length === 1) {
      Alert.alert(
        'Exit',
        'Are you sure?', [{
          text: 'No',
          onPress: () => true,
        }, {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(),
        },
        ], {
          cancelable: false,
        },
      );
      return true;
    }
    return false;
  }

  render() {
    return (
      <Router
        backAndroidHandler={this.handleBackPress}
        sceneStyle={styles.scenesStyle}
        headerTintColor={styles.headerTintColor}
      >
        <Stack
          titleStyle={styles.titleStyle}
          headerLayoutPreset='center'
          hideNavBar
          key="root"
        >
          <Stack hideNavBar key="load">
            <Scene
              initial
              title="Home"
              key="home"
              component={LoadingPage}
            />
          </Stack>
          <Stack navTransparent key="auth">
            <Scene
              initial
              key="login"
              title="Login"
              component={LoginPage}
            />
            <Scene
              key="register"
              title="Register"
              component={RegisterForm}
            />
            <Scene
              key="forgotPassword"
              title="Forgot Password"
              component={ForgotPassword}
            />
          </Stack>
          <Stack navTransparent key="main">
            <Scene
              initial
              hideNavBar
              title="Dashboard"
              key="dashboard"
              component={DashboardPage}
            />
            <Scene
              title="My profile"
              key="profile"
              component={EditProfilePage}
            />
            <Scene
              title="New measurement"
              key="measurements"
              component={MeasurementsPage}
            />
            <Scene
              title="My prescriptions"
              key="prescriptions"
              component={PrescriptionsPage}
            />
            <Scene
              title="Information"
              key="prescriptionDetails"
              component={PrescriptionDetailsPage}
            />
            <Scene
              title="Disease"
              key="disease"
              component={DiseasePage}
            />
            <Scene
              title="Drug side effects"
              key="sideEffects"
              component={SideEffectsPage}
            />
            <Scene
              title="Map"
              key="map"
              component={Map}
            />
          </Stack>
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
