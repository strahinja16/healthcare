import React, { Component } from 'react';
import { Alert, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  Content, Form, Spinner, Card, Row,
} from 'native-base';
import PropType from 'prop-types';
import Button from '../common/Button';
import styles from './style';
import LGContainer from '../common/LGContainer';
import { postMeasurements } from '../../api/measurement';
import extractErrorsFromResponse from '../../util/extractErrorMessagesFromResponse';
import ColButton from './ColButton';
import TemperatureStrategy from './TemperatureStrategy';
import PulseStrategy from './PulseStrategy';
import PressureStrategy from './PressureStrategy';
import SugarStrategy from './SugarStrategy';

class MesureParameter extends Component {
  constructor(props) {
    super(props);

    this.inputRef = null;
    this.state = {
      selectedValue: 'sugar',
      loading: false,
    };

    this.submitMeasurements = this.submitMeasurements.bind(this);
    this.handlerChangeType = this.handlerChangeType.bind(this);
    this.handlerChangeInput = this.handlerChangeInput.bind(this);
  }

   async submitMeasurements() {
    this.setState({ loading: true });
    const data = {
      pressure: null,
      pulse: null,
      temperature: null,
      sugar: null,
    };

    const error = this.inputRef.validate();
    if (error) {
      this.setState({ loading: false });
      return Alert.alert('Error', error);
    }

    const { selectedValue } = this.state;
    data[selectedValue] = this.inputRef.getData();

    try {
      const { user: { id } } = this.props;
      const { pressure, pulse, temperature, sugar } = data;

      const result = await postMeasurements(id, pressure, pulse, temperature, sugar);
      Actions.main({ type: 'reset' });
    } catch (e) {
      const messages = extractErrorsFromResponse(e.response);
      Alert.alert('Error', messages.length > 0 && messages[0]);
      this.setState({ loading: false });
    }
  }

  handlerChangeType(type) {
    this.setState({ selectedValue: type })
  }

  handlerChangeInput(ref) {
    this.inputRef = ref;
  }

  renderInput() {
    const { selectedValue } = this.state;
    switch(selectedValue) {
      case 'sugar': return (<SugarStrategy setRef={this.handlerChangeInput} />);
      case 'pressure': return (<PressureStrategy setRef={this.handlerChangeInput} />);
      case 'temperature': return (<TemperatureStrategy setRef={this.handlerChangeInput} />);
      case 'pulse': return (<PulseStrategy setRef={this.handlerChangeInput} />);
    }
  }

  render() {
    const { loading, selectedValue } = this.state;
    return (
      <LGContainer style={styles.containerStyle}>
        <Content padder>

        <Content contentContainerStyle={styles.contentButtonsStyle}>
          <Row>
            <ColButton
              active={selectedValue}
              value='sugar'
              handler={this.handlerChangeType}
            >
              Sugar
            </ColButton>
            <ColButton
              active={selectedValue}
              value='pressure'
              handler={this.handlerChangeType}
            >
              Pressure
            </ColButton>
            <ColButton
              active={selectedValue}
              value='pulse'
              handler={this.handlerChangeType}
            >
              Pulse
            </ColButton>
            <ColButton
              active={selectedValue}
              value='temperature'
              handler={this.handlerChangeType}
            >
              Temperature
            </ColButton>
          </Row>
        </Content>

        <Content contentContainerStyle={{ flex: 4 }}>
          <Card> 
            <Form>
                {this.renderInput()}
            </Form>
            { loading ? <Spinner /> : <Button onPress={this.submitMeasurements}>Submit</Button> }
          </Card>
          </Content>
        </Content>
      </LGContainer>
    );
  }
}

MesureParameter.propTypes = {
  user: PropType.shape({}).isRequired,
};

export default MesureParameter;
