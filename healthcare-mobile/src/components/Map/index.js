import React, { Component } from 'react';
import { Content, Card, Text } from 'native-base';
import PropType from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LGContainer from '../common/LGContainer';
import styles from './styles';
import { getCurrentLocation } from '../../util/getCurrentPosition';

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
    } 
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

  render() {
    const { region } = this.state;
    const { helpCoordinates } = this.props;

    return (
      <LGContainer>
        <Content contentContainerStyle={styles.contentStyle}>
          <Card transparent style={styles.headerContainerStyle}>
            <Text style={styles.headerTextStyle}>Location of the SOS</Text>
          </Card>
          <Card style={styles.mapContainerStyle}>
            <MapView
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