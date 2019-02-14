/* eslint-disable */
import React from 'react';
import TypeStrategy from '../TypeStrategy';
import { Label, Item, Input } from 'native-base';


class TemperatureStrategy extends TypeStrategy {
  constructor(props) {
    super(props);

    this.state = { value: null };
  }

  validate() {
    const { value } = this.state;
    let error = null;
    if (value == null || value == undefined) {
      error = 'Temperature cant be empty.';
    } else if (value < 30) {
      error = 'Temperature must be greater than 30.';
    } else if (value > 45) {
      error = 'Temperature must be less than 45.';
    }
    return error;
  }

  getData() {
    const { value } = this.state;
    return value;
  }

  render() {
    return (
      <Item stackedLabel>
        <Label>Temperature:</Label>
          <Input
            placeholder='37.2'
            onChangeText={value => this.setState({ value })}
            value={this.state.value}
          />
      </Item>
    );
  }
}

export default TemperatureStrategy;
