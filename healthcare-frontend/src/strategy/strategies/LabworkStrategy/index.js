
import React from 'react';
import Strategy from '../Strategy';
import LabworkList from "../../../components/LabworkList";

class LabworkStrategy extends Strategy {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return <LabworkList {...this.props}/>
  }
}

export default LabworkStrategy;
