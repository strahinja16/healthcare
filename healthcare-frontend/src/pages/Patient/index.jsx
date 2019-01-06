
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
import { getPatient as getPatientAction } from "../../reducers/patient";
import pusherService from "../../services/pusher";
import CreateLabworkModal from "../../components/CreateLabworkModal";
import {createLabwork, getLabworks, removeLabwork} from "../../thunks/labwork";
import LabworkList from "../../components/LabworkList";


class PatientPage extends Component {
  constructor(props) {
    super(props);

    this.modalRef = React.createRef();
    this.openModal = this.openModal.bind(this);
    this.pushCharts = this.pushCharts.bind(this);
    this.examinationFinished = this.examinationFinished.bind(this);
    this.createPrescription = this.createPrescription.bind(this);
    this.createExamination = this.createExamination.bind(this);
    this.getPanes = this.getPanes.bind(this);
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

  examinationFinished(id) {
    const { examinationFinishedAction } = this.props;

    examinationFinishedAction(id);
  }

  getPanes() {
    const {
      prescriptions,
      examinations,
      labworks,
      match:{ params: { id } },
      createLabworkAction,
      removeLabworkAction,
    } = this.props;

    const noBorder = { border: '0px' };

    return [
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
      {
        menuItem: 'Labworks',
        render: () => (
          <Tab.Pane
            attached={false}
            style={noBorder}
          >
            <LabworkList createLabwork={this.openModal} removeLabwork={removeLabworkAction} labworks={labworks}/>
            <CreateLabworkModal ref={this.modalRef} createLabworkAction={createLabworkAction} id={id}/>
          </Tab.Pane>
        ),
      },
    ];
  }

  render() {
    const {
      patient,
      prescriptions,
      examinations,
      labworks,
    } = this.props;
    if (!patient || !prescriptions || !examinations || !labworks ) {
      return null;
    }

    return (
      <Grid columns={2} divided>
        <Grid.Column>
          <PatientProfile patient={patient} />
          <Divider hidden />
          <Button basic color="black" fluid onClick={() => this.pushCharts()}>View more...</Button>
          <Divider />
        </Grid.Column>

        <Grid.Column>
          <Tab menu={{ secondary: true, pointing: true }} panes={this.getPanes()} />
        </Grid.Column>
      </Grid>
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
