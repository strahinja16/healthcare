
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Tab, Divider, Button, Header } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPatient } from '../../thunks/patient';
import PatientProfile from '../../components/PatientProfile';
import { getPresureData } from '../../thunks/charts';
import Charts from '../../components/Charts';


class ChartsPage extends Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const {
      patient,
      getPatientAction,
      match: {
        params: {
          id,
        },
      },
      getPresurChartAction
    } = this.props;
    getPresurChartAction(id);
    if(!patient)
      getPatientAction(id);
  }


  goBack() {
    this.props.history.goBack();
  }

  render() {
    const { patient } = this.props;
    const { charts } = this.props;
    if (!patient) {
      return null;
    }
    if(!charts)
      return null;

    const preasureDataTest = charts.pressure;
    const sugarDataTest = charts.sugar;
    const temperatureDataTest = charts.temperature;

    return (

      <Grid columns={2} divided>
        <Grid.Column>
          <PatientProfile patient={patient} />
          <Divider hidden />
          <Button basic color="black" fluid onClick={() => this.goBack()}>Back</Button>
          <Divider />
        </Grid.Column>

        <Grid.Column>
          <Header as="h1">Blood preasure</Header>
          <Charts type={0} data={preasureDataTest} />
          <Header as="h1">Blood sugar</Header>
          <Charts type={1} data={sugarDataTest} />
          <Header as="h1">Blood temperature</Header>
          <Charts type={2} data={temperatureDataTest} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ charts, patient }) => ({
  patient: patient.get('patient'),
  charts: charts.get('charts'),
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getPatientAction: getPatient,
    getPresurChartAction: getPresureData,
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChartsPage),
);
