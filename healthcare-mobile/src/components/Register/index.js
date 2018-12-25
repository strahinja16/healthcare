import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Content, Form, Input, Item, Spinner, Card
} from 'native-base';
import styles from './style';
import { register as registerApi } from '../../api/auth';
import LGContainer from '../common/LGContainer';
import Button from '../common/Button';
import extractErrorsFromResponse from '../../util/extractErrorMessagesFromResponse';
import validate from '../../validation';
import validationSchema from './validation';

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      name: null,
      loading: false,
    };

    this.register = this.register.bind(this);
  }

  async register() {
    const error = validate(this.state, validationSchema);
    if (error) {
      return Alert.alert('Error', error);
    }

    this.setState({ loading: true });
    const { email, password, name } = this.state;

    try {
      await registerApi(name, email, password);
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
            <Text style={styles.textHeaderStyle}>New account</Text>
            <Text style={styles.textDescriptionStyle}>Make a request</Text>
            <Form>
              <Item style={styles.itemStyle}>
                  <Input 
                    placeholder="Name:"
                    style={styles.inputStyle}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                  />
              </Item>
              <Item style={styles.itemStyle}>
                  <Input 
                    placeholder="Email address:"
                    style={styles.inputStyle}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                  />
              </Item>
              <Item last style={styles.itemStyle}>
                  <Input
                    placeholder="Password:"
                    style={styles.inputStyle}
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                  />
              </Item>
            </Form>
            { loading ? <Spinner /> : <Button style={styles.buttonStyle} onPress={this.register}>Register</Button> }
          </Card>
        </Content>
      </LGContainer>
    );
  }
}

export default RegisterForm;
