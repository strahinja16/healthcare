import React, { Component } from 'react';
import { Alert, View, Text, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Content, Form, Input, Item, Spinner, Picker, Icon, Label, Card,
} from 'native-base';
import PropType from 'prop-types';
import Button from '../common/Button';
import styles from './style';
import LGContainer from '../common/LGContainer';
import { postMeasurements } from '../../api/measurement';
import extractErrorsFromResponse from '../../util/extractErrorMessagesFromResponse';
import validate from '../../validation';
import validationSchema from './validation';

class MesureParameter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: 'sugar',
      pressure: null,
      pulse: null,
      temperature: null,
      sugar: null,
      loading: false,
      value: null,
    };

    this.submitMeasurements = this.submitMeasurements.bind(this);
  }

   submitMeasurements() {
    this.setState({ loading: true, pressure: null, pulse: null, temperature: null, sugar: null });
    const { selectedValue, value } = this.state;
    this.setState({ [selectedValue]: value }, async () => {

        const { pressure, pulse, temperature, sugar } = this.state;

        const error = validate(this.state, validationSchema);
        if (error) {
          this.setState({ loading: false });
          return Alert.alert('Error', error);
        }

        try {
          const { user: { id } } = this.props;

          const result = await postMeasurements(id, pressure, pulse, temperature, sugar);
          console.log(result);
          Actions.main({ type: 'reset' });
        } catch (e) {
          console.log(e); 
          const messages = extractErrorsFromResponse(e.response);
          Alert.alert('Error', messages.length > 0 && messages[0]);
          this.setState({ loading: false });
        }
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <LGContainer>
        <Content padder contentContainerStyle={styles.contentStyle}>
        <Card>
          
          <Form>
          <Item>
            <Label>Type:</Label>
                <Picker
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    mode="dropdown"
                    style={{ width: undefined }}
                    selectedValue={this.state.selectedValue}
                    onValueChange={selectedValue => this.setState({ selectedValue, value: null })}
                >   
                  <Picker.Item key={0} label="Blood sugar" value="sugar" />
                  <Picker.Item key={1} label="Blood pressure" value="pressure" />
                  <Picker.Item key={2} label="Pulse" value="pulse" />
                  <Picker.Item key={3} label="Temperature" value="temperature" />
                </Picker>
            </Item>
            <Item last>
              <Label>Value:</Label>
                <Input
                  placeholder={this.state.selectedValue === "pressure" ? "120/80" : ''}
                  onChangeText={value => this.setState({ value })}
                  value={this.state.value}
                />
            </Item>
          </Form>
          { loading ? <Spinner /> : <Button onPress={this.submitMeasurements}>Submit</Button> }
        </Card>
        </Content>
      </LGContainer>
    );
  }
}

MesureParameter.propTypes = {
  user: PropType.shape({}).isRequired,
};

export default MesureParameter;
