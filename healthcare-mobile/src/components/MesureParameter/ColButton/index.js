/* eslint-disable */
import React, { Component } from 'react';
import { Col, Button, Text } from 'native-base';

import PropTypes from 'prop-types';
import styles from '../style';

class ColButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { active, children, handler, value } = this.props;
    return (
      <Col>
        <Button full
          style={[styles.buttonTypeStyle, active === value ? styles.activeButton : null]}
          onPress={() => handler(value)}
        >
          <Text style={active === value ? styles.activeTextColor : styles.textColor} uppercase={false}>{children}</Text>
        </Button>
      </Col>
    );
  }
}

ColButton.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default ColButton;
