/* eslint-disable */
import React from 'react';
import TypeStrategy from '../TypeStrategy';
import { Label, Item, Input } from 'native-base';

class PulseStrategy extends TypeStrategy {
  constructor(props) {
    super(props);

    this.state = { value: null };
  }

  validate() {
    const { value } = this.state;
    let error = null;
    if (value == null || value == undefined) {
      error = 'Pulse cant be empty.';
    } else if (value < 0) {
      error = 'Pulse must be greater than 0.';
    } else if (value > 300) {
      error = 'Pulse must be less than 300.';
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
        <Label>Pulse:</Label>
          <Input
            placeholder='65'
            onChangeText={value => this.setState({ value })}
            value={this.state.value}
          />
      </Item>
    );
  }
}

export default PulseStrategy;
