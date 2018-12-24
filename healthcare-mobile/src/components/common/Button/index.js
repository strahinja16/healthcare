import React from 'react';
import { Text } from 'react-native';
import { Button as ButtonBase } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import PropType from 'prop-types';
import Section from '../Section';
import styles from './style';


const Button = ({ onPress, children, style }) => (
  <Section>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0, 0.99]}
        colors={['#56b1d2', '#56e5a6']}
        style={styles.linearGradient}
      >
      <ButtonBase transparent style={[styles.btnStyle, style]} onPress={onPress}>
        <Text style={styles.buttonText}>
          {children}
        </Text>
      </ButtonBase>
    </LinearGradient>
  </Section>
);

Button.propTypes = {
  onPress: PropType.func.isRequired,
  children: PropType.string.isRequired,
  style: PropType.shape({}),
};

Button.defaultProps = {
  style: {},
};

export default Button;
