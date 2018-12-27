
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text, Button, Card } from 'native-base';

import { perscriptions } from '../../mocks/home';
import { Actions } from 'react-native-router-flux';
import theme from '../../theme';
import BackEffect from '../BackEffects';

const styleButton = StyleSheet.create({
  containerMeasure: {
    width: 70,
    height: 70,
    alignSelf: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    backgroundColor: '#b3d2ee',
    borderColor: 'white',
  },
  buttonMeasure: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#b3d2ee',
  },
});

const Perscriptions = (props) => (
  // <View>
  <ScrollView style={styles.container}>
  <BackEffect />
    {props.prescriptions.map((prescription, key) =>
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
      </Card>)}
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.colors.background,
  },
  perscription: {
    alignSelf: 'stretch',
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: theme.colors.light,
    borderBottomColor: theme.colors.dark,
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    lineHeight: 20,
  },
  value: {
    flex: 2,
    textAlign: 'left',
    lineHeight: 20,
  },
  detailsCol: {
    flex: 4,
    height: 80,
    justifyContent: 'space-evenly',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonCol: {
    flex: 1,
  },
  button: {
    flex: 1,  
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.transparent,
    borderWidth: 0,
    elevation: 0,
    borderLeftWidth: 1,
    borderRadius: 0,
    borderColor: theme.colors.borders
  },
  buttonText: {
    color: theme.colors.text,
  },
});

export default Perscriptions;
