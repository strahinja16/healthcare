/* eslint-disable */
import React from 'react';
import TypeStrategy from '../TypeStrategy';
import { Label, Item, Input } from 'native-base';

class SugarStrategy extends TypeStrategy {
  constructor(props) {
    super(props);

    this.state = { value: null };
  }

  validate() {
    const { value } = this.state;
    let error = null;
    if (value == null || value == undefined) {
      error = 'Sugar cant be empty.';
    } else if (value < 0) {
      error = 'Sugar must be greater than 0.';
    } else if (value > 150) {
      error = 'Sugar must be less than 150.';
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
        <Label>Sugar:</Label>
          <Input
            placeholder='5.5'
            onChangeText={value => this.setState({ value })}
            value={this.state.value}
          />
      </Item>
    );
  }
}

export default SugarStrategy;
