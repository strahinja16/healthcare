
import React from 'react';

import PANES from './panes';
import PrescriptionStrategy from "./strategies/PrescriptionStrategy";
import ExaminationStrategy from "./strategies/ExaminationStrategy";
import LabworkStrategy from "./strategies/LabworkStrategy";

class StrategyContext {
  constructor(type, props) {
    switch(type) {
      case PANES.Prescriptions:
       this.strategy =  new PrescriptionStrategy(props);
       break;
      case PANES.Examinations:
        this.strategy =  new ExaminationStrategy(props);
        break;
      case PANES.Labworks:
        this.strategy =  new LabworkStrategy(props);
        break;
      default: this.strategy = null;
    }
  }

  getPane() {
    return this.strategy.render();
  }
}

export default StrategyContext;
