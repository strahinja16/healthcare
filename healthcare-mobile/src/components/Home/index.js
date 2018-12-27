import React, { Component } from 'react';
import { View, Text, AsyncStorage, NetInfo } from 'react-native';
import LottieView from 'lottie-react-native';
import LGCointainer from '../common/LGContainer';
import styles from './style';
import { Actions } from 'react-native-router-flux';
import { loadUserAndToken } from '../../reducers/auth';

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
      const user = JSON.parse(await AsyncStorage.getItem('user'));

      loadUserAndToken({ token, user })

      if (token && type !== 'none') {
        Actions.main({ type: 'reset', preview: false });
        console.log('Dashboard');
      } else if (token) {
        Actions.main({ type: 'reset', preview: true });
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
