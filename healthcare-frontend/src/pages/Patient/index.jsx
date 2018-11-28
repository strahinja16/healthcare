
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid, Tab, Divider, Button,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPatient } from '../../thunks/patient';
import PatientProfile from '../../components/PatientProfile';
import PrescriptionList from '../../components/PrescriptionList';
import { getActivePrescriptions } from '../../thunks/prescription';
import { examinationFinished, getExaminations } from '../../thunks/examination';
import ExaminationList from '../../components/ExaminationList';


class PatientPage extends Component {
  constructor(props) {
    super(props);

    this.pushCharts = this.pushCharts.bind(this);
    this.examinationFinished = this.examinationFinished.bind(this);
    this.createPrescription = this.createPrescription.bind(this);
    this.createExamination = this.createExamination.bind(this);
  }

  componentDidMount() {
    const {
      getPatientAction,
      match: {
        params: {
          id,
        },
      },
      getActivePrescriptionsAction,
      getExaminationsAction,
    } = this.props;

    getPatientAction(id);
    getActivePrescriptionsAction(id);
    getExaminationsAction(id);
  }

  pushCharts() {
    const { history: { location, push } } = this.props;
    push(`${location.pathname}/charts`);
  }

  createPrescription() {
    const { history: { location, push } } = this.props;
    push(`${location.pathname}/prescription`);
  }

  createExamination() {
    const { history: { location, push } } = this.props;
    push(`${location.pathname}/examination`);
  }

  examinationFinished(id) {
    const { examinationFinishedAction } = this.props;

    examinationFinishedAction(id);
  }

  render() {
    const { patient, prescriptions, examinations } = this.props;
    if (!patient || !prescriptions || !examinations) {
      return null;
    }

    const noBorder = { border: '0px' };
    const panes = [
      {
        menuItem: 'Prescriptions',
        render: () => (
          <Tab.Pane attached={false} style={noBorder}>
            <PrescriptionList
              createPrescription={this.createPrescription}
              prescriptions={prescriptions}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Examination',
        render: () => (
          <Tab.Pane
            attached={false}
            style={noBorder}
          >
            <ExaminationList
              createExamination={this.createExamination}
              examinationFinished={this.examinationFinished}
              examinations={examinations}
            />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <Grid columns={2} divided>
        <Grid.Column>
          <PatientProfile patient={patient} />
          <Divider hidden />
          <Button basic color="black" fluid onClick={() => this.pushCharts()}>View more...</Button>
          <Divider />
        </Grid.Column>

        <Grid.Column>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Grid.Column>
      </Grid>
    );
  }
}

PatientPage.defaultProps = {
  patient: null,
  prescriptions: null,
  examinations: null,
};

PatientPage.propTypes = {
  getPatientAction: PropTypes.func.isRequired,
  getExaminationsAction: PropTypes.func.isRequired,
  examinationFinishedAction: PropTypes.func.isRequired,
  getActivePrescriptionsAction: PropTypes.func.isRequired,
  patient: PropTypes.shape({}),
  prescriptions: PropTypes.arrayOf(PropTypes.shape({})),
  examinations: PropTypes.arrayOf(PropTypes.shape({})),
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};


const mapStateToProps = ({ patient, prescription, examination }) => ({
  patient: patient.get('patient'),
  prescriptions: prescription.get('prescriptions'),
  examinations: examination.get('examinations'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getPatientAction: getPatient,
    getActivePrescriptionsAction: getActivePrescriptions,
    getExaminationsAction: getExaminations,
    examinationFinishedAction: examinationFinished,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PatientPage),
);
