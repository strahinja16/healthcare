import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Content, Card, Text, Row, Col, Button } from 'native-base';
import PropType from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import LGContainer from '../common/LGContainer';
import styles from './styles';
import { getCurrentLocation } from '../../util/getCurrentPosition';
import config from '../../config/googleMaps';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 100,
        longitudeDelta: 100,
      },
      confirmHelp: null,
    }

    this.helpConfirmed = this.helpConfirmed.bind(this);
    this.directionsReady = this.directionsReady.bind(this);
  }

  componentDidMount() {
    return getCurrentLocation().then(position => {
      if (position) {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
        });
      }
    });
  }

  helpConfirmed() {
    this.setState({ confirmHelp: true });
  }

  renderConfirmHelp() {
    const { confirmHelp } = this.state;

    if(confirmHelp === null) {
      return (
        <Card transparent style={styles.helpCardStyle}>
          <Row style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>Confirm help?</Text>
          </Row>
          <Row>
            <Col>
              <Button onPress={() => this.setState({ confirmHelp: false })} style={styles.buttonNoStyle}>
                <Text style={styles.buttonTextStyle}>No</Text>
              </Button>
            </Col>

            <Col>
              <Button onPress={this.helpConfirmed} style={styles.buttonYesStyle}>
                <Text>Yes</Text>
              </Button>
            </Col>
          </Row>
        </Card>
      );
    }
  }

  renderDirections() {
    const { region, confirmHelp } = this.state;
    const { helpCoordinates } = this.props;
    const { apiKey } = config;
    
    if(confirmHelp) {
      return (
        <MapViewDirections
          origin={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          destination={helpCoordinates}
          apikey={apiKey}
          strokeWidth={5}
          strokeColor="#00b3fd"
          onReady={this.directionsReady}
        />
      );
    }
  }

  directionsReady(result) {
    const { distance, coordinates, duration } = result;

    Alert.alert('Info', `Distance: ${distance.toFixed(3)} km, estimated time: ${duration.toFixed(2)} min`);
    // this.setState({ distance, duration });
    
    this.mapView.fitToCoordinates(coordinates);
  }

  render() {
    const { region } = this.state;
    const { helpCoordinates } = this.props;

    return (
      <LGContainer>
        <Content contentContainerStyle={styles.contentStyle}>
          <Card transparent style={styles.headerContainerStyle}>
            <Text style={styles.headerTextStyle}>Location of the SOS</Text>
          </Card>
          {this.renderConfirmHelp()}
          <Card style={styles.mapContainerStyle}>
            <MapView
              ref={c => this.mapView = c}
              showsUserLocation
              provider={PROVIDER_GOOGLE}
              style={styles.mapStyle}
              region={region}
            >
            <MapView.Marker
              coordinate={helpCoordinates}
              title={'Requested help'}
              description={'Requested help'}
            />
            {this.renderDirections()}
            </MapView>
          </Card>
        </Content>
      </LGContainer>
    );
  }
}

Map.propTypes = {
  helpCoordinates: PropType.shape({}).isRequired,
  user: PropType.string.isRequired,
};

export default Map;