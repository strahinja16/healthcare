
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Header } from '../../components/elements';
import { createPrescription } from '../../thunks/prescription';
import CreatePrescription from '../../components/CreatePrescription';

const CreatePrescriptionPage = ({ createPrescriptionAction, history, match: { params: id } }) => (
  <Grid stackable centered columns={2}>
    <Grid.Column>
      <Header header="Create prescription" />
      <Segment>
        <CreatePrescription history={history} id={id} onSubmit={createPrescriptionAction} />
      </Segment>
    </Grid.Column>
  </Grid>
);

CreatePrescriptionPage.propTypes = {
  createPrescriptionAction: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    createPrescriptionAction: createPrescription,
  },
  dispatch,
);

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(CreatePrescriptionPage),
);
