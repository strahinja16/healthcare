import React, { Component } from 'react';
import { View, Text, AsyncStorage, NetInfo } from 'react-native';
import LottieView from 'lottie-react-native';
import LGCointainer from '../common/LGContainer';
import styles from './style';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentWillUnmount() {
    this.lottie.reset();
  }

  async componentDidMount() {
    this.lottie.play();

    try {
      const { type } = await NetInfo.getConnectionInfo();
      const token = await AsyncStorage.getItem('_token');

      if (token && type !== 'none') {
        Actions.main({ type: 'reset', text: 'Dashboard' });
        console.log('Dashboard');
      } else if (token) {
        Actions.main({ type: 'reset', text: 'Preview' });
        console.log('Preview');
      } else {
        Actions.auth({ type: 'reset' });
      }
    } catch (e) {
      Alert.alert('Error', 'Please restart the application.');
    }
  }

  render() {
    return (
      <LGCointainer>
        <View style={styles.contentStyle}>
          <LottieView
            ref={lottie => this.lottie = lottie}
            source={require('./animation.json')}
            style={styles.animationStyle}
          />
          <Text style={styles.textStyle}>HealthCare</Text>
        </View>
      </LGCointainer>
    );
  }
};

export default Home;
