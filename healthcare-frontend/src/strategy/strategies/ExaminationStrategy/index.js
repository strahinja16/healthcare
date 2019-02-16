
import React from 'react';
import Strategy from '../Strategy';
import ExaminationList from "../../../components/ExaminationList";

class ExaminationStrategy extends Strategy {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return <ExaminationList {...this.props}/>
  }
}

export default ExaminationStrategy;
