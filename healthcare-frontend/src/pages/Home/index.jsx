
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    const { loadUsersAction, self } = this.props;
    loadUsersAction(self.get('id'));
  }

  render() {
    const { users, history: { push }, self } = this.props;
    const { addUser } = this.props;
    if (!users) {
      return null;
    }
    return (
      <Grid>
        <Home users={users} doctor={self} pushAction={push} name={self.get('name')} addUser={addUser} />
      </Grid>
    );
  }
}

const mapStateToProps = ({ user, auth }) => {
  return (
    {
      users: user.get('users'),
      self: auth.get('user'),
    });
};

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
