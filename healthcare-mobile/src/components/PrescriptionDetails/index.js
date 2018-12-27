
import React from 'react';
import PropType from 'prop-types';
import { View } from 'react-native';
import {
  Content, Text, CardItem, Body, Card,
} from 'native-base';
import style from './style';
import moment from 'moment';
import LGContainer from '../common/LGContainer';

const PrescriptionDetails = (props) => {
  const { prescription } = props;
  return (
    <LGContainer>
      <Content contentContainerStyle={style.contentStyle}>
        <Card>
            <View style={style.informationsStyle}>
              <CardItem header bordered>
                <Text style={style.header}>
                  Name
                </Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Text>
                    {prescription.drug}
                  </Text>
                </Body>
              </CardItem>

              <CardItem header bordered>
                <Text style={style.header}>
                  Interval
                </Text>
              </CardItem>

              <CardItem bordered>
                <Body>
                  <Text>
                    Every {prescription.hours} hours
                  </Text>
                </Body>
              </CardItem>

              <CardItem header bordered>
                <Text style={style.header}>
                  Dose
                </Text>
              </CardItem>

              <CardItem bordered>
                <Body>
                  <Text>
                    {prescription.quantity} pills
                  </Text>
                </Body>
              </CardItem>

              <CardItem header bordered>
                <Text style={style.header}>
                  Due date
                </Text>
              </CardItem>

              <CardItem bordered>
                <Body>
                  <Text>
                    {moment(prescription.dueDate).format('DD/MM/YYYY')}
                  </Text>
                </Body>
              </CardItem>

              <CardItem header bordered>
                <Text style={style.header}>
                  Note
                </Text>
              </CardItem>

              <CardItem bordered>
                <Body>
                  <Text>
                    {prescription.note}
                  </Text>
                </Body>
              </CardItem>

            </View>
        </Card>
      </Content>
    </LGContainer>
  );
};

PrescriptionDetails.propTypes = {
  prescription: PropType.shape({}).isRequired,
};

export default PrescriptionDetails;
