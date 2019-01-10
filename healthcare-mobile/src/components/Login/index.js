import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import {
  Content, Spinner, Form, Item, Input, Card, Button as ButtonBase,
} from 'native-base';
import PropTypes from 'prop-types';
import styles from './style';
import { Actions } from 'react-native-router-flux';
import Button from '../common/Button';
import LGContainer from '../common/LGContainer';
import extractErrorsFromResponse from '../../util/extractErrorMessagesFromResponse';
import validate from '../../validation';
import validationSchema from './validation';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: null,
      password: null,
    };

    this.login = this.login.bind(this);
  }

  async login() {
    this.setState({ loading: true });
    const { email, password } = this.state;

    const error = validate(this.state, validationSchema);
    if (error) {
      this.setState({ loading: false });
      return Alert.alert('Error', error);
    }

    try {
      const { loginAction } = this.props;
      await loginAction(email, password);
      Actions.main({ type: 'reset' });
    } catch(e) {
      const messages = extractErrorsFromResponse(e.response);
      Alert.alert('Error', messages.length > 0 && messages[0]);
      this.setState({ loading: false });
    }
  }

  renderButtons() {
    const { loading } = this.state;
    return (
      <View>
        <Card style={styles.cardStyle}>
          <Text style={styles.textHeaderStyle}>Your personal HealthCare assistant</Text>
          <Text style={styles.textDescriptionStyle}>Sign in or request a new account</Text>
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
          <ButtonBase
            onPress={() => Actions.forgotPassword()}
            transparent
            style={styles.alignSelf}
          >
            <Text style={{color: styles.inputPlaceholderColor}}>
              Forgot Password?
            </Text>
          </ButtonBase>
          <Text style={styles.textOrStyle}>OR</Text>
          <Button onPress={() => Actions.register()}>Register</Button>
        </Card>
      </View>
    );
  }

  render() {
    return (
        <LGContainer>
        <Content padder contentContainerStyle={styles.contentStyle}>
          {this.renderButtons()}
        </Content>
      </LGContainer>
    );
  }
}

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
};

export default Login;
