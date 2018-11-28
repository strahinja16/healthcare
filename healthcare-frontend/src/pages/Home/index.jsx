
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers, addUser } from '../../thunks/users';
import Home from '../../components/Home';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadUsersAction } = this.props;
    loadUsersAction();
  }

  render() {
    const { users, history: { push }, self } = this.props;
    const { addUser } = this.props;
    if (!users) {
      return null;
    }
    return (
      <Grid>
        <Home users={users} pushAction={push} name={self} addUser={addUser} />
      </Grid>
    );
  }
}

const mapStateToProps = ({ user, auth }) => ({
  users: user.get('users'),
  self: auth.get('user').get('name')
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    loadUsersAction: getUsers,
    addUser: addUser
  },
  dispatch,
);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
