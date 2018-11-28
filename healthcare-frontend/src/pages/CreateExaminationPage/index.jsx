
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Segment, Header } from '../../components/elements';
import { createExamination } from '../../thunks/examination';
import CreateExamination from '../../components/CreateExamination';

const CreateExaminationPage = ({ createExaminationAction, history, match: { params: id } }) => (
  <Grid stackable centered columns={2}>
    <Grid.Column>
      <Header header="Schedule an appointment" />
      <Segment>
        <CreateExamination history={history} id={id} onSubmit={createExaminationAction} />
      </Segment>
    </Grid.Column>
  </Grid>
);

CreateExaminationPage.propTypes = {
  createExaminationAction: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    createExaminationAction: createExamination,
  },
  dispatch,
);

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(CreateExaminationPage),
);
