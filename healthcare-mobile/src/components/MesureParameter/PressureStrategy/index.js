/* eslint-disable */
import React from 'react';
import TypeStrategy from '../TypeStrategy';
import { View } from 'react-native';
import { Label, Item, Input } from 'native-base';

class PressureStrategy extends TypeStrategy {
  constructor(props) {
    super(props);

    this.state = { high: null, low: null };
  }

  validate() {
    const { high, low } = this.state;
    let error = null;
    if (high == null || high == undefined || low == null || low == undefined) {
      error = 'Pressure cant be empty.';
    } else if (high < 0) {
      error = 'Higher number must be greater than 0.';
    } else if (high > 300) {
      error = 'Higher number must be less than 300.';
    } else if (low < 0) {
      error = 'Lower number must be greater than 0.';
    } else if (low > 200) {
      error = 'Lower number must be less than 200.';
    }
    return error;
  }

  getData() {
    const { high, low } = this.state;
    return `${high}/${low}`;
  }

  render() {
    return (
      <View>
        <Item stackedLabel>
          <Label>Upper number:</Label>
            <Input
              placeholder='120'
              onChangeText={high => this.setState({ high })}
              value={this.state.value}
            />
        </Item>
        <Item stackedLabel>
        <Label>Lower number:</Label>
          <Input
            placeholder='80'
            onChangeText={low => this.setState({ low })}
            value={this.state.value}
          />
      </Item>
    </View>
    );
  }
}

export default PressureStrategy;
