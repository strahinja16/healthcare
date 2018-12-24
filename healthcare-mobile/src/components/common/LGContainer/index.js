import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PropType from 'prop-types';
import styles from './style';


const LGContainer = ({ children, style }) => (
  <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.0, 0.99]}
      colors={['#56b1d2', '#56e5a6']}
      style={[styles.linearGradient, style]}
    >
    {children}
  </LinearGradient>
);

LGContainer.propTypes = {
  children: PropType.node.isRequired,
  style: PropType.shape({}),
};

LGContainer.defaultProps = {
  style: {},
};

export default LGContainer;
