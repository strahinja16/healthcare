
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
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
    this.preparePrescriptions = this.preparePrescriptions.bind(this);
  }

  preparePrescriptions() {
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
          <Text style={styles.value}>{prescription.hoursFrequency}</Text>
        </View>
        <View key={key} style={styles.info}>
          <Text style={styles.text}>Dose</Text>
          <Text style={styles.value}>{prescription.quantity}</Text>
        </View>
      </View>
      <View style={styles.buttonCol}>
        <Button style={styles.button} onPress={() => {
            Actions.prescriptionDetails({ prescription: prescription });
          }}>
          <Text style={styles.buttonText}>   ></Text>
        </Button>
      </View>
    </Card>);
  }

  renderPrescriptions() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {this.preparePrescriptions()}
      </ScrollView>
    );
  }

  renderSpinner() {
    return (
      <Content contentContainerStyle={styles.contentStyle}>
        <Spinner color='#fff' />
      </Content>
    );
  }

  render() {
    const { prescriptions } = this.props;
    return (
      <LGContainer>
        {prescriptions ? this.renderPrescriptions() : this.renderSpinner()}
      </LGContainer>
      );
  }
}

Perscriptions.propTypes = {
  prescriptions: PropType.array,
};

export default Perscriptions;
