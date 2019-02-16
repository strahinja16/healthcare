
import React from 'react';
import Strategy from '../Strategy';
import PrescriptionList from "../../../components/PrescriptionList";

class PrescriptionStrategy extends Strategy {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return <PrescriptionList {...this.props}/>
  }
}

export default PrescriptionStrategy;
