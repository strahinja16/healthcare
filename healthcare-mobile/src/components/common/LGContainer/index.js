import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropType from 'prop-types';
import styles from './style';

class LGContainer extends Component {
  constructor(props) {
    super(props);

    this.state = { paddingTop: 0 };
    
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    this.setState({ paddingTop: 80 });
  }

  _keyboardDidHide () {
    this.setState({ paddingTop: 0 });
  }

  render() {
    const { style, children } = this.props;
    const { paddingTop } = this.state;
    return (
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0.0, 0.99]}
        colors={['#56b1d2', '#56e5a6']}
        style={[styles.linearGradient, { paddingTop }, style]}
      >
        {children}
      </LinearGradient>
    );
  }
}

LGContainer.propTypes = {
  children: PropType.node.isRequired,
  style: PropType.shape({}),
};

LGContainer.defaultProps = {
  style: {},
};

export default LGContainer;
