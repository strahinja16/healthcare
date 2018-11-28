
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  List, Header, Image, Divider,
} from 'semantic-ui-react';
import style from './style.scss';

const PatientProfile = ({ patient }) => (
  <div className={style.maxWidth}>
    <Header as="h1" className={style.centerAlign}>{patient.name}</Header>
    <Image
      className={style.autoMargin}
      src="https://image.flaticon.com/icons/svg/265/265674.svg"
      size="small"
      circular
    />
    <div className={style.mTop}>
      <Divider horizontal inverted>
        <Header as="h2">Patient information</Header>
      </Divider>
      <List divided relaxed>
        <List.Item>
          <List.Header>Email</List.Header>
          <List.Icon name="mail" />
          <List.Content>
            {patient.email}
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Header>Gender</List.Header>
          <List.Icon name="venus mars" />
          <List.Content>
            <List.Content>{patient.gender}</List.Content>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Header>Weight</List.Header>
          <List.Icon name="weight" />
          <List.Content>
            <List.Content>{patient.weight}</List.Content>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Header>Height</List.Header>
          <List.Icon name="sort content descending" />
          <List.Content>
            <List.Content>{patient.height}</List.Content>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Header>Birthday</List.Header>
          <List.Icon name="birthday cake" />
          <List.Content>
            <List.Content>{patient.birthday ? moment(patient.birthday).format('d.m.Y') : null }</List.Content>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Header>Blood type</List.Header>
          <List.Icon name="heart" />
          <List.Content>
            <List.Content>{patient.bloodType}</List.Content>
          </List.Content>
        </List.Item>
      </List>
    </div>
  </div>
);

PatientProfile.propTypes = {
  patient: PropTypes.shape({}).isRequired,
};

export default PatientProfile;
