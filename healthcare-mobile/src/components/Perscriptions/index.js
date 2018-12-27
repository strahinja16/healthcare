
import React, { Component } from 'react';
import { View, Text, Button, Card, Content, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropType from 'prop-types';
import LGContainer from '../common/LGContainer';
import styles from './style';

class Perscriptions extends Component {
  constructor(props) {
    super(props);
   
    this.renderPrescriptions = this.renderPrescriptions.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  renderPrescriptions() {
    const { prescriptions } = this.props;

    return prescriptions.map((prescription, key) =>
    <Card style={styles.perscription}>
      <View style={styles.detailsCol}>
        <View key={key} style={styles.info}>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.value}>{prescription.drug}</Text>
        </View>
        <View key={key} style={styles.info}>
          <Text style={styles.text}>Interval</Text>
          <Text style={styles.value}>{prescription.hours}</Text>
        </View>
        <View key={key} style={styles.info}>
          <Text style={styles.text}>Dose</Text>
          <Text style={styles.value}>{prescription.quantity}</Text>
        </View>
      </View>
      <View style={styles.buttonCol}>
        <Button style={styles.button} onPress={() => {
            Actions.perscriptionDetails({ perscription: prescription });
          }}>
          <Text style={styles.buttonText}>   ></Text>
        </Button>
      </View>
    </Card>);
  }

  renderSpinner() {
    return (
      <Content contentContainerStyle={styles.contentStyle}>
        <Spinner color='#fff' />
      </Content>
    );
  }

  render() {
    const { prescription } = this.props;
    return (
      <LGContainer>
        {prescription ? this.renderPrescriptions() : this.renderSpinner()}
      </LGContainer>
      );
  }
}

Perscriptions.propTypes = {
  prescriptions: PropType.array,
};

export default Perscriptions;
