/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TypeStrategy extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef(this);
    const { setRef } = props;
    setRef(this);
  }

  validate() {
    throw new Error('Child classes of TypeStrategy must implement validate method.');
  }

  getData() {
    throw new Error('Child classes of TypeStrategy must implement getData method.');
  }
}

TypeStrategy.propTypes = {
  setRef: PropTypes.func.isRequired,
};

export default TypeStrategy;
