
import React from 'react';
import PropType from 'prop-types';
import { View } from 'react-native';
import {
  Container, Content, Text, CardItem, Body, Card,
} from 'native-base';
import style from './style';
import moment from 'moment';

const PrescriptionDetails = (props) => {
  const { perscription } = props;
  return (
    <Container style={style.containerStyle}>
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
                    {perscription.drug}
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
                    Every {perscription.hours} hours
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
                    {perscription.quantity} pills
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
                    {moment(perscription.dueDate).format('DD/MM/YYYY')}
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
                    {perscription.note}
                  </Text>
                </Body>
              </CardItem>

            </View>
        </Card>
      </Content>
    </Container>
  );
};

PrescriptionDetails.propTypes = {
  perscription: PropType.shape({}).isRequired,
};

export default PrescriptionDetails;
