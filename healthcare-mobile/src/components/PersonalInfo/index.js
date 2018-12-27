
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text, Card } from 'native-base';
import theme from '../../theme';
import moment from 'moment';

const PersonalInfo = (props) => (
  <View style={styles.infoContainer}>
    <Card style={styles.personalInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Birthday</Text>
          <Text style={styles.text}>{moment(props.user.birthday).format('DD/MM/YYYY')}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Blood Type</Text>
          <Text style={styles.text}>{props.user.bloodType}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Height</Text>
          <Text style={styles.text}>{props.user.height}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Weight</Text>
          <Text style={styles.text}>{props.user.weight}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Gender</Text>
          <Text style={styles.text}>{props.user.gender === 'M' ? 'Male' : 'Female'}</Text>
        </View>
        {props.examination && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>Next appointment</Text>
          <Text style={styles.text}>{moment(props.examination.appointment).format('DD/MM/YYYY')}</Text>
        </View>)}
    </Card>
  </View>
);

const styles = StyleSheet.create({
  infoContainer: {
    // alignSelf: 'stretch',
    flex: 1,
    margin: 20,
    marginTop: 20,
  },
  personalInfo: {
    padding: 20,
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.light,
    borderWidth: 1,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    textAlign: 'left',
    lineHeight: 30,
  },
});

export default PersonalInfo;
