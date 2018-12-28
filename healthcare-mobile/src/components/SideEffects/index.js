
import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropType from 'prop-types';
import { Card, CardItem, Text, Body, Content, Spinner } from 'native-base';
import LGContainer from '../common/LGContainer';
import { getSideEffects as getSideEffectsApi } from '../../api/medications';
import extractErrorsFromResponse from '../../util/extractErrorMessagesFromResponse';
import styles from './styles';

class SideEffects extends Component {
  constructor(props) {
    super(props);

    this.state = { sideEffects: null };

    this.renderSideEffects = this.renderSideEffects.bind(this);
  }

  componentDidMount() {
    const { prescription } = this.props;
    getSideEffectsApi(prescription.drug)
      .then(response => {
        const sideEffects = response.data;
        console.log(sideEffects);
        this.setState({ sideEffects });
      })
      .catch(e => {
        const messages = extractErrorsFromResponse(e.response);
        Alert.alert('Error', messages.length > 0 && messages[0]);
      });
  }

  renderSideEffects() {
    const { sideEffects } = this.state;
    if(sideEffects.length === 0) {
      return (<Card style={styles.cardStyle}>
          <CardItem header bordered>
            <Text style={styles.header}>
              Empty
            </Text>
          </CardItem>
        </Card>);
    }
    return sideEffects.map((sideEffect, key) =>
        <Card style={styles.cardStyle}>
          <CardItem header bordered>
            <Text style={styles.header}>
              {sideEffect}
            </Text>
          </CardItem>
        </Card>
    );
  }

  render() {
    const { sideEffects } = this.state;
    return (
      <LGContainer>
        <Content contentContainerStyle={styles.contentStyle}>
          {sideEffects ? this.renderSideEffects() : <Spinner color='#fff' />}
        </Content>
      </LGContainer>
    );
  }
}

SideEffects.propTypes = {
  prescription: PropType.shape({}).isRequired,
};

export default SideEffects;