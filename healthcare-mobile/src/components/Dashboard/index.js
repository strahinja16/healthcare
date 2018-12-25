import React, { Component } from 'react';
import { Text } from 'react-native';
import PropType from 'prop-types';
import LGContainer from '../common/LGContainer';
import styles from './style';


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props;
    return (
      <LGContainer>
        <Text>{text}</Text>
      </LGContainer>
    );
  }
}

Dashboard.propTypes = {
  text: PropType.string.isRequired,
};

export default Dashboard;
