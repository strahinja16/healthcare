import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import LGCointainer from '../common/LGContainer';
import styles from './style';
import { Actions } from 'react-native-router-flux';
import { Button } from 'native-base';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true };
  }

  componentDidMount() {
    setTimeout(() => Actions.auth(), 2000);
  }

  render() {
    return (
      <LGCointainer>
        <View style={styles.contentStyle}>
          <LottieView
            source={require('./animation.json')}
            style={styles.animationStyle}
            autoPlay
          />
          <Text style={styles.textStyle}>HealthCare</Text>
        </View>
      </LGCointainer>
    );
  }
};

export default Home;
