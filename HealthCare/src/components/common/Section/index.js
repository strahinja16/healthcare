import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

const Section = ({ style, children }) => (
  <View style={[styles.containerStyle, style]}>
    {children}
  </View>
);

Section.propTypes = {
  style: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
};

Section.defaultProps = {
  style: {},
};

export default Section;
