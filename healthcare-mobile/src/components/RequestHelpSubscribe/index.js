import React, { Component } from 'react';
import { View } from 'react-native';
import PropType from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestedHelp as requestedHelpAction } from '../../reducers/sos';
import pusherService from '../../services/pusher';

class RequestHelpSubscribe extends Component {

  constructor(props) {
    super(props);

    this.requestedHelpHandler = this.requestedHelpHandler.bind(this);
  }

  requestedHelpHandler(data) {
    //Data validation
    //Confirm help

    const { requestedHelpPushAction } = this.props;

    requestedHelpPushAction(data);
  }

  componentDidMount() {
    pusherService.subscribe('sos', 'request-help', this.requestedHelpHandler);
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
