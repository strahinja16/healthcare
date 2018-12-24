import React, { Component } from 'react';
import { Alert, View, AsyncStorage, Text } from 'react-native';
import {
  Content, Spinner, Form, Item, Input, Card, Button as ButtonBase,
} from 'native-base';
import { login as loginApi } from '../../api/auth';
import styles from './style';
import { Actions } from 'react-native-router-flux';
import Button from '../common/Button';
import LGContainer from '../common/LGContainer';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: null,
      password: null,
      loadingApp: true,
    };

    this.login = this.login.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('_token')
      .then(value => {
        if(value) {
          Actions.main();
        }
        this.setState({ loadingApp: false });
      })
      .catch(() =>{
        this.setState({ loadingApp: false });
      });
  }

  async login() {
    this.setState({ loading: true });
    const { email, password } = this.state;
    try {
      const { data: { data }} = await loginApi(email, password);
      await AsyncStorage.setItem('_token', data.token);
      delete data.token;
      await AsyncStorage.setItem('user', JSON.stringify(data));
      Actions.main();
    } catch(e) {
      console.log(e); 
      Alert.alert('Error.');
      this.setState({ loading: false });
    }
  }

  renderButtons() {
    const { loading } = this.state;
    return (
      <View>
        <Card style={styles.cardStyle}>
          <Form>
            <Item style={styles.itemStyle}>
                <Input
                  placeholder="Email address"
                  placeholderTextColor={styles.inputPlaceholderColor}
                  onChangeText={email => this.setState({ email })}
                  style={styles.inputStyle}
                  value={this.state.email}
                />
            </Item>
            <Item style={styles.itemStyle} last>
                <Input
                  placeholder="Password"
                  placeholderTextColor={styles.inputPlaceholderColor}
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  style={styles.inputStyle}
                  value={this.state.password}
                />
            </Item>
          </Form>
          { loading ? <Spinner /> : (<Button onPress={this.login}>Login</Button>) }
          <ButtonBase transparent style={styles.alignSelf}><Text style={{color: styles.inputPlaceholderColor}} >Forgot Password?</Text></ButtonBase>
          <Text style={styles.alignSelf}>OR</Text>
          <Button onPress={() => Actions.register()}>Register</Button>
        </Card>
      </View>
    );
  }

  render() {
    const { loadingApp } = this.state;

    return (
        <LGContainer>
        <Content padder contentContainerStyle={styles.contentStyle}>
          { loadingApp ? <Spinner color={styles.spinnerColor} /> : this.renderButtons() }
        </Content>
      </LGContainer>
    );
  }
}

export default Login;
