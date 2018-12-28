
import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropType from 'prop-types';
import { Card, CardItem, Text, Body, Content, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import LGContainer from '../common/LGContainer';
import { getDisease as getDiseaseApi } from '../../api/medications';
import extractErrorsFromResponse from '../../util/extractErrorMessagesFromResponse';
import styles from './styles';

class Disease extends Component {
  constructor(props) {
    super(props);

    this.state = { disease: null };

    this.renderDisease = this.renderDisease.bind(this);
  }

  componentDidMount() {
    const { prescription } = this.props;
    getDiseaseApi(prescription.disease)
      .then(response => {
        const { disease } = response.data;
        this.setState({ disease });
      })
      .catch(e => {
        const messages = extractErrorsFromResponse(e.response);
        Alert.alert('Error', messages.length > 0 && messages[0]);
        Actions.main({ type: 'reset' });
      });
  }

  renderDisease() {
    const { disease } = this.state;
    return (
        <Card style={styles.cardStyle}>
          <CardItem header bordered>
            <Text style={styles.header}>
              Disease name
            </Text>
          </CardItem>
    
          <CardItem bordered>
            <Body>
              <Text>
                {disease.name}
              </Text>
            </Body>
          </CardItem>
    
          <CardItem header bordered>
            <Text style={styles.header}>
              Discription
            </Text>
          </CardItem>
    
          <CardItem bordered>
            <Body>
              <Text>
                {disease.description}
              </Text>
            </Body>
          </CardItem>
        </Card>
    );
  }

  render() {
    const { disease } = this.state;
    return (
      <LGContainer>
        <Content contentContainerStyle={styles.contentStyle}>
          {disease ? this.renderDisease() : <Spinner color='#fff' />}
        </Content>
      </LGContainer>
    );
  }
}

Disease.propTypes = {
  prescription: PropType.shape({}).isRequired,
};

export default Disease;