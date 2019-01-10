import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Content, Card, Text, Icon, Button, Row, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropType from 'prop-types';
import moment from 'moment';
import LGContainer from '../common/LGContainer';
import styles from './style';
import { requestHelp as requestHelpApi } from '../../api/sos';
import shortid from 'shortid';
import pusherService from '../../services/pusher';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { channel: null };

    this.locationFound = this.locationFound.bind(this);
  }

  componentWillUnmount() {
    const { channel } = this.state;

    if(channel !== null) {
      pusherService.unsubscribe('sos-requested');
    }
  }

  async locationFound(data) {
    const { user: { id } } = this.props;
    const { coords: { latitude, longitude } } = data;

    const channel = shortid.generate();

    try {
      await requestHelpApi(id, longitude, latitude, channel);
      this.setState({ channel });
      pusherService.subscribe('sos-requested', `help-${channel}`, this.helpOnTheWay);
      Alert.alert('Success', 'Sos signal sent. Waiting for response');
    } catch(e) {
      this.getLocationError(e);
    }
  }

  getLocationError(error) {
    Alert.alert('Error', 'Error while sending sos signal');
  }

  helpOnTheWay(data) {
    const { distance, duration } = data;
    Alert.alert('Help on the way!', `Help is ${distance} km away and coming in ${duration} min`);
    pusherService.unsubscribe('sos-requested');
  }

  render() {
    const { preview, user } = this.props;
    return (
      <LGContainer>
        <Content contentContainerStyle={styles.contentStyle}>
          <Card transparent style={styles.headerWrapper}>
              <View style={styles.iconWrapperStyle}>
                <Icon name='person-outline' type="MaterialIcons" style={styles.iconStyle} />
              </View>
              <View style={styles.textWrapperStyle}>
                <Text style={styles.textStyle}>{user.name}</Text>
                <Text style={styles.textStyle}>{user.email}</Text>
              </View>
              <View style={styles.buttonWrapper}>
                <Button rounded style={styles.buttonStyle} onPress={() => Actions.profile()}>
                  <Text uppercase={false} style={styles.buttonTextStyle}>My account</Text>
                </Button>
              </View>
          </Card>
          <Card style={styles.cardStyle}>
            <Row>
              <Col style={styles.columnStyle}>
                <Row>
                  <Col style={styles.columnIconStyle}>
                    <Icon name='altimeter' type="MaterialCommunityIcons" style={styles.innerIconStyle} />
                  </Col>
                  <Col style={styles.inner2column}>
                    <Text>{user.height}</Text>
                    <Text>Height</Text>
                  </Col>
                </Row>
              </Col>
              
              <Col style={styles.columnStyle}>
                <Row>
                  <Col style={styles.columnIconStyle}>
                    <Icon name='weight' type="MaterialCommunityIcons" style={styles.innerIconStyle} />
                  </Col>
                  <Col style={styles.inner2column}>
                    <Text>{user.weight}</Text>
                    <Text>Weight</Text>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col style={styles.columnStyle}>
                <Row>
                  <Col style={styles.columnIconStyle}>
                    <Icon name='gender-male-female' type="MaterialCommunityIcons" style={styles.innerIconStyle} />
                  </Col>
                  <Col style={styles.inner2column}>
                    <Text>{user.gender}</Text>
                    <Text>Gender</Text>
                  </Col>
                </Row>
              </Col>
              
              <Col style={styles.columnStyle}>
                <Row>
                  <Col style={styles.columnIconStyle}>
                    <Icon name='tint' type="FontAwesome" style={styles.innerIconStyle} />
                  </Col>
                  <Col style={styles.inner2column}>
                    <Text>{user.bloodType}</Text>
                    <Text>Blood type</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
            
            <Row>
              <Col style={styles.columnStyle}>
                <Row>
                  <Col style={styles.columnIconStyle}>
                    <Icon name='cake' type="MaterialCommunityIcons" style={styles.innerIconStyle} />
                  </Col>
                  <Col style={styles.inner2column}>
                    <Text>{moment(user.birthday).format('YYYY/MM/DD')}</Text>
                    <Text>Birthday</Text>
                  </Col>
                </Row>
              </Col>
              
              <Col style={styles.columnStyle}>
                <Row>
                  <Col style={styles.columnIconStyle}>
                    <Icon name='account-card-details' type="MaterialCommunityIcons" style={styles.innerIconStyle} />
                  </Col>
                  <Col style={styles.inner2column}>
                    <Text>{user.lbo}</Text>
                    <Text>SSN</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          <Card style={styles.cardButtonsStyle}>
            <Row>
              <Col style={styles.colWithButtonStyle}>
                <Button style={styles.buttonColStyle} onPress={() => Actions.prescriptions()}>
                  <Icon name='pill' type="MaterialCommunityIcons" style={styles.innerIconStyle} />
                  <Text uppercase={false} style={styles.buttonColTextStyle}>Pills</Text>
                </Button>
              </Col>
              <Col style={styles.colWithButtonStyle}>
                <Button style={styles.buttonColStyle} onPress={() => Actions.measurements()}>
                    <Icon name='timeline' type="MaterialIcons" style={styles.innerIconStyle} />
                    <Text uppercase={false} style={styles.buttonColTextStyle}>Measurements</Text>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col style={styles.colWithButtonStyle}>
                <Button style={styles.buttonColStyle} onPress={() => navigator.geolocation.getCurrentPosition(this.locationFound, this.getLocationError)}>
                  <Icon name='medkit' type="FontAwesome" style={styles.helpIconStyle} />
                  <Text uppercase={false} style={styles.buttonColTextStyle}>Request help</Text>
                </Button>
              </Col>
            </Row>
          </Card>
        </Content>
      </LGContainer>
    );
  }
}

Dashboard.propTypes = {
  user: PropType.shape({}).isRequired,
  preview: PropType.bool.isRequired,
};

export default Dashboard;
