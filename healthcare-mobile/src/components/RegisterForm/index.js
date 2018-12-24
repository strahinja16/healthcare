import React, { Component } from 'react';
import { Alert, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Container, Content, Form, Input, Item, Spinner, Card
} from 'native-base';
import styles from './style';
import { register as registerApi } from '../../api/auth';
import Button from '../common/Button';

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
    this.setState({ loading: true });
    const { email, password, name } = this.state;

    try {
      await registerApi(name, email, password);
      Actions.login({ type: 'reset' });
    } catch (e) {
      console.log(e); 
      Alert.alert('Error.');
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <Container style={styles.containerStyle}>
        <Content padder contentContainerStyle={styles.contentStyle}>
          <Card>
          <Form>
            <Item>
                <Input 
                  placeholder="Name:"
                  onChangeText={name => this.setState({ name })}
                  value={this.state.name}
                />
            </Item>
            <Item>
                <Input 
                  placeholder="Email address:"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
            </Item>
            <Item last>
                <Input
                  placeholder="Password:"
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
            </Item>
          </Form>
          { loading ? <Spinner /> : <Button style={styles.button} onPress={this.register}>Register</Button> }
          </Card>
        </Content>
      </Container>
    );
  }
}

export default RegisterForm;
