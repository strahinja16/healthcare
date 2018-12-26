
import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  List, Header, Image, Divider, Grid, Icon, Input, Button
} from 'semantic-ui-react';
import { Segment } from './../elements'
import style from './style.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      lbo: '',
    };

    this.renderUsers = this.renderUsers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddUser = this.onAddUser.bind(this);
  }

  onInputChange(e) {
    this.setState({ lbo: e.target.value })
  }

  onAddUser() {
    const { lbo } = this.state;
    const { doctor, addUser, pushAction } = this.props;

    addUser(lbo, doctor.get('id'))
      .then(() => pushAction('/home'));

    this.setState({
      isVisible: false,
      lbo: '',
    });
  }

  renderUsers(users, pushAction) {
    return users.map((user) => {
      return (
        <List.Item
          className={style.classItem}
          key={user.id}
          onClick={() => pushAction(`/patient/${user.id}`)}
        >
          <Image avatar src="https://image.flaticon.com/icons/svg/265/265674.svg" />
          <List.Content>
            <List.Header as="a">{user.name}</List.Header>
            <List.Description as="a">{user.email}</List.Description>
          </List.Content>

        </List.Item>
      );
    });
  }

  render() {
    const { users, pushAction, name } = this.props;
    const { isVisible, lbo } = this.state;
    const icon = isVisible ? 'close': 'add';
    return (
      <div className={style.maxWidth}>
        <Grid columns={3}>
          <Grid.Column />
          <Grid.Column verticalAlign="middle">
            <Header as="h1" className={style.ceneterAlign}>Dr. {name}</Header>
            <Image
              className={style.autoMargin}
              src="https://image.flaticon.com/icons/svg/206/206855.svg"
              size="small"
              circular
            />

          </Grid.Column>
          <Grid.Column>
            <Icon name={icon} className={style.addIcon} onClick={() => {
              this.setState({ isVisible: !this.state.isVisible })
            }} />
            <Divider hidden />
            <div hidden={!this.state.isVisible}>
              <Segment className={style.corrner}>
                <Input placeholder='User lbo' fluid value={lbo} onChange={this.onInputChange} />
                <Divider hidden />
                <Button basic color='green' content='Add new patient' fluid onClick={this.onAddUser} />
              </Segment>
            </div>
          </Grid.Column>
        </Grid>
        <div className={style.mTop}>
          <Divider horizontal inverted>
            <Header as="h2">Patients list</Header>
          </Divider>
          <List divided relaxed>
            {this.renderUsers(users, pushAction)}
          </List>
        </div>
      </div>
    );
  }
}

export default Home;
