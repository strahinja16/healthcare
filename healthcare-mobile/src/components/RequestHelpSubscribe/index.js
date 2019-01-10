import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import PropType from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestedHelp as requestedHelpAction } from '../../reducers/sos';
import pusherService from '../../services/pusher';
import { Actions } from 'react-native-router-flux';
import { getDistanceBetweenPoints } from '../../util/getDistanceBetweenCoords';

class RequestHelpSubscribe extends Component {

  constructor(props) {
    super(props);

    this.requestedHelpHandler = this.requestedHelpHandler.bind(this);
    this.helpConfirmed = this.helpConfirmed.bind(this);
  }

  requestedHelpHandler(data) {
    navigator.geolocation.getCurrentPosition((locationData) => this.locationFound(locationData, data), this.getLocationError);
  }

  async locationFound(locationData, helpData) {
    const { coords: { latitude, longitude } } = locationData;

    const { coordinates } = helpData;

    const d = getDistanceBetweenPoints(latitude, longitude, coordinates.latitude, coordinates.longitude);
    const distance = 5;

    if(d < distance && d !== 100) {
      Alert.alert('Help requested', 'Check the location?',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => this.helpConfirmed(helpData)},
      ],
      { cancelable: false });
    }
  }

  getLocationError(error) {
    Alert.alert('Error', 'Error while getting location');
  }

  helpConfirmed(data) {
    const { requestedHelpPushAction } = this.props;

    requestedHelpPushAction(data);

    Actions.map();
  }

  componentDidMount() {
    const ch = pusherService.subscribe('sos', 'request-help', this.requestedHelpHandler);
  }

  componentWillUnmount() {
    pusherService.unsubscribe('sos');
  }

  render() {
    return (
      <View>  
      </View>
    );
  }
}

RequestHelpSubscribe.propTypes = {
  requestedHelpPushAction: PropType.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestedHelpPushAction: requestedHelpAction,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(RequestHelpSubscribe);
