
import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Grid, Divider, Button,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPatient } from '../../thunks/patient';
import PatientProfile from '../../components/PatientProfile';
import { getActivePrescriptions } from '../../thunks/prescription';
import { examinationFinished, getExaminations } from '../../thunks/examination';
import { getPatient as getPatientAction } from "../../reducers/patient";
import pusherService from "../../services/pusher";
import {createLabwork, getLabworks, removeLabwork} from "../../thunks/labwork";
import Segment from "../../components/elements/Segment";
import StrategyContext from "../../strategy";
import PANES from '../../strategy/panes';


class PatientPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pane: null,
    };

    this.openModal = this.openModal.bind(this);
    this.pushCharts = this.pushCharts.bind(this);
    this.examinationFinished = this.examinationFinished.bind(this);
    this.createPrescription = this.createPrescription.bind(this);
    this.createExamination = this.createExamination.bind(this);
    this.createLabwork = this.createLabwork.bind(this);
    this.renderPane = this.renderPane.bind(this);
    this.setPane = this.setPane.bind(this);
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
      updatePatientPushAction,
      getLabworksAction,
    } = this.props;

    getPatientAction(id);
    getActivePrescriptionsAction(id);
    getLabworksAction(id);
    getExaminationsAction(id);

    pusherService.subscribe(`users-${id}`, 'update', updatePatientPushAction);
  }

  componentWillReceiveProps() {
    const { prescriptions } = this.props;
    const props = {
      createPrescription: this.createPrescription,
      prescriptions,
    };
    this.setPane(PANES.Prescriptions, props);
  }

  componentWillUnmount() {
    const {
      match:{ params: { id } },
    } = this.props;
    pusherService.unsubscribe(`users-${id}`);
  }

  openModal() {
    this.modalRef.current.open();
  }

  pushCharts() {
    const { history: { location: { pathname }, push } } = this.props;
    push(`${pathname}/charts`);
  }

  createPrescription() {
    const { history: { location: { pathname }, push } } = this.props;
    push(`${pathname}/prescription`);
  }

  createExamination() {
    const { history: { location: { pathname }, push } } = this.props;
    push(`${pathname}/examination`);
  }

  createLabwork() {
    const { history: { location: { pathname }, push } } = this.props;
    push(`${pathname}/labwork`);
  }

  examinationFinished(id) {
    const { examinationFinishedAction } = this.props;

    examinationFinishedAction(id);
  }

  setPane(type, props) {
    this.setState({
      pane: {
        type,
        props,
      }
    });
  }

  renderPane() {
    const { pane } = this.state;
    const { prescriptions } = this.props;

    if (pane) {
      const { type, props } = pane;
      const strategyContext = new StrategyContext(type, props);
      return strategyContext.getPane();
    }

    const props = {
      createPrescription: this.createPrescription,
      prescriptions,
    };
    const strategyContext = new StrategyContext(PANES.Prescriptions, props);
    return strategyContext.getPane();
  }

  render() {
    const {
      patient,
      prescriptions,
      examinations,
      labworks,
      removeLabworkAction,
    } = this.props;
    if (!patient || !prescriptions || !examinations || !labworks ) {
      return null;
    }


    return (
      <Fragment>
        <Grid columns={2} divided>
          <Grid.Column>
            <PatientProfile patient={patient} />
            <Divider hidden />
            <Button basic color="black" fluid onClick={() => this.pushCharts()}>View more...</Button>
            <Divider />
          </Grid.Column>

          <Grid.Column>
            <div style={{ display: 'flex'}}>
              <div style={{ margin: 'auto', display: 'inline'}}>
                <Button
                  basic
                  color="teal"
                  content="Prescriptions"
                  onClick={() => {
                    const props = {
                      createPrescription: this.createPrescription,
                      prescriptions,
                    };
                    this.setPane(PANES.Prescriptions, props);
                  }}
                />
              </div>
              <div style={{ margin: 'auto', display: 'inline'}}>
                <Button
                  basic
                  color="blue"
                  content="Examinations"
                  onClick={() => {
                    const props = {
                      createExamination: this.createExamination,
                      examinationFinished: this.examinationFinished,
                      examinations,
                    };
                    this.setPane(PANES.Examinations, props);
                  }}
                />
              </div>
              <div style={{ margin: 'auto', display: 'inline'}}>
                <Button
                  content="Labworks"
                  basic
                  color="purple"
                  onClick={() => {
                    const props = {
                      createLabwork: this.createLabwork,
                      removeLabwork: removeLabworkAction,
                      labworks,
                    };
                    this.setPane(PANES.Labworks, props);
                  }}
                />
              </div>
            </div>
            <Segment>
              {this.renderPane()}
            </Segment>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

PatientPage.defaultProps = {
  patient: null,
  prescriptions: null,
  examinations: null,
  labworks: null,
};

PatientPage.propTypes = {
  getPatientAction: PropTypes.func.isRequired,
  getExaminationsAction: PropTypes.func.isRequired,
  examinationFinishedAction: PropTypes.func.isRequired,
  getActivePrescriptionsAction: PropTypes.func.isRequired,
  updatePatientPushAction: PropTypes.func.isRequired,
  createLabworkAction: PropTypes.func.isRequired,
  getLabworksAction: PropTypes.func.isRequired,
  removeLabworkAction: PropTypes.func.isRequired,
  patient: PropTypes.shape({}),
  prescriptions: PropTypes.arrayOf(PropTypes.shape({})),
  examinations: PropTypes.arrayOf(PropTypes.shape({})),
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};


const mapStateToProps = ({ patient, prescription, examination, labwork }) => ({
  patient: patient.get('patient'),
  prescriptions: prescription.get('prescriptions'),
  examinations: examination.get('examinations'),
  labworks: labwork.get('labworks'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getPatientAction: getPatient,
    getActivePrescriptionsAction: getActivePrescriptions,
    getExaminationsAction: getExaminations,
    examinationFinishedAction: examinationFinished,
    updatePatientPushAction: getPatientAction,
    createLabworkAction: createLabwork,
    getLabworksAction: getLabworks,
    removeLabworkAction: removeLabwork,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PatientPage),
);
