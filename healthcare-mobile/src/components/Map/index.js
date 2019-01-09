import React from 'react';
import { Content, Card, Text } from 'native-base';  
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LGContainer from '../common/LGContainer';
import styles from './styles';

const Map = () => (
  <LGContainer>
    <Content contentContainerStyle={styles.contentStyle}>
      <Card transparent style={styles.headerContainerStyle}>
        <Text style={styles.headerTextStyle}>Location of the SOS</Text>
      </Card>
      <Card style={styles.mapContainerStyle}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </Card>
    </Content>
  </LGContainer>
);

export default Map;