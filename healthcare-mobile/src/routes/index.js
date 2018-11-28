import React, { Component } from 'react';
import {
  Stack, Scene, Router, Actions,
} from 'react-native-router-flux';
import { Alert, BackHandler } from 'react-native';
import Home from '../components/Home';

const styles = {
  scenesStyle: {
    backgroundColor: '#f2f2f2',
  },
};

class RouterComponent extends Component {
  handleBackPress() {
    this.funcName = 'handleBackPress';
    if (Actions.currentScene === 'home') {
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
      >
        <Stack hideNavBar key="root">
          <Stack key="main">
            <Scene
              title="Home"
              key="home"
              component={Home}
              initial
            />
          </Stack>
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
