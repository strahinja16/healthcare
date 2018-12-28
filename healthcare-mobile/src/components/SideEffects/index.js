
import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropType from 'prop-types';
import { Card, CardItem, Text, Body, Content, Spinner } from 'native-base';
import LGContainer from '../common/LGContainer';
import { getSideEffects as getSideEffectsApi } from '../../api/medications';
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
        Alert.alert('Error', e.response.data);
      });
  }

  renderSideEffects() {
    const { sideEffects } = this.state;
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