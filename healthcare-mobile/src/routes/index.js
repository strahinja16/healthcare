import React, { Component } from 'react';
import {
  Stack, Scene, Router, Actions,
} from 'react-native-router-flux';
import { Alert, BackHandler } from 'react-native';
import LoadingPage from '../pages/Loading';
import RegisterForm from '../components/Register';
import LoginPage from '../pages/Login';
import DashboardPage from '../pages/Dashboard';
import ForgotPassword from '../components/ForgotPassword';

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
          <Stack hideNavBar key="main">
            <Scene
              initial
              title="Dashboard"
              key="dashboard"
              component={DashboardPage}
            />
          </Stack>
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
