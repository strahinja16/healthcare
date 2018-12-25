import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Content, Form, Input, Item, Spinner, Card
} from 'native-base';
import styles from './style';
import { forgotPassword as forgotPasswordApi } from '../../api/auth';
import LGContainer from '../common/LGContainer';
import Button from '../common/Button';
import extractErrorsFromResponse from '../../util/extractErrorMessagesFromResponse';
import validate from '../../validation';
import validationSchema from './validation';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      loading: false,
    };

    this.sendResetRequest = this.sendResetRequest.bind(this);
  }

  async sendResetRequest() {
    const error = validate(this.state, validationSchema);
    if (error) {
      return Alert.alert('Error', error);
    }

    this.setState({ loading: true });
    const { email } = this.state;

    try {
      await forgotPasswordApi(email);
      Actions.login({ type: 'reset' });
    } catch (e) {
      const messages = extractErrorsFromResponse(e.response);
      Alert.alert('Error', messages.length > 0 && messages[0]);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <LGContainer>
        <Content padder contentContainerStyle={styles.contentStyle}>
          <Card style={styles.cardStyle}>
          <Form>
            <Text style={styles.headerTextStyle}>Forgot password?</Text>
            <Text style={styles.textStyle}>Enter your email below and we will send you the reset link.</Text>
            <Item style={styles.itemStyle}>
                <Input 
                  placeholder="Email address:"
                  style={styles.inputStyle}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
            </Item>
          </Form>
          { loading ? <Spinner /> : <Button style={styles.buttonStyle} onPress={this.sendResetRequest}>Submit</Button> }
          </Card>
        </Content>
      </LGContainer>
    );
  }
}

export default ForgotPassword;
