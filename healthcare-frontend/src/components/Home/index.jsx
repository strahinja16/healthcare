
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
      userId: ""
    }

    this.renderUsers = this.renderUsers.bind(this);
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
    const { users } = this.props;
    const { pushAction } = this.props;
    const { name } = this.props;
    const { addUser } = this.props;
    let icon = "add";
    if (this.state.isVisible)
      icon = "close";
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
                <Input placeholder='User id' fluid onChange={event => {
                  this.setState({ userId: event.target.value })
                }} />
                <Divider hidden />
                <Button basic color='green' content='Add new patient' fluid onClick={() => {
                  this.setState({isVisible: false, userId: ""});
                  addUser(this.state.userId)
                }} />
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
