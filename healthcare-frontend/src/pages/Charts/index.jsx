
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Divider, Button, Header } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MEASUREMENTS from '../../consts/measurements';
import { getPatient } from '../../thunks/patient';
import PatientProfile from '../../components/PatientProfile';
import Chart from '../../components/Chart';
import { getMeasurements } from "../../thunks/charts";
import { addMeasurement } from "../../reducers/charts";
import { getPatient as getPatientAction } from "../../reducers/patient";
import pusher from '../../services/pusher';


class ChartsPage extends Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
  }

  componentDidMount() {
    const {
      getPatientAction,
      match:{ params: { id } },
      getChartsAction,
      addMeasurementPushAction,
      updatePatientPushAction,
    } = this.props;

    getChartsAction(id);
    getPatientAction(id);

    pusher
      .subscribe(`measurements-${id}`)
      .bind('create', ({ measurement }) => addMeasurementPushAction(measurement));

    pusher
      .subscribe(`users-${id}`)
      .bind('update', ({ user }) => updatePatientPushAction(user));
  }

  componentWillUnmount() {
    const {
      match:{ params: { id } },
    } = this.props;
    pusher.unsubscribe(`measurements-${id}`);
    pusher.unsubscribe(`users-${id}`);
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  renderCharts() {
    const { charts } = this.props;
    if (!charts) {
      return null;
    }
    return Object.keys(MEASUREMENTS).map(measurement =>
      (<Fragment key={MEASUREMENTS[measurement]}>
        <Header as="h1">{MEASUREMENTS[measurement]}</Header>
        <Chart type={measurement} data={charts[MEASUREMENTS[measurement]]}/>
      </Fragment>))
  }

  render() {
    const { patient } = this.props;
    const { charts } = this.props;
    if (!patient || !charts) {
      return null;
    }

    return <Grid columns={2} divided>
      <Grid.Column>
        <PatientProfile patient={patient}/>
        <Divider hidden/>
        <Button basic color="black" fluid onClick={this.goBack}>Back</Button>
        <Divider/>
      </Grid.Column>
      <Grid.Column>
        {this.renderCharts()}
      </Grid.Column>
    </Grid>;
  }
}

const mapStateToProps = ({ charts, patient }) => ({
  patient: patient.get('patient'),
  charts: charts.get('charts'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getPatientAction: getPatient,
    getChartsAction: getMeasurements,
    addMeasurementPushAction: addMeasurement,
    updatePatientPushAction: getPatientAction,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChartsPage),
);
