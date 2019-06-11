import React, { PureComponent } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import { PASTEL_COLOR } from '../utils/colors';
import Icon from 'react-native-ionicons';

type Props = {
  isChecked: PropTypes.bool.isRequired,
  iconColor: PropTypes.string.isRequired,
  onRequestChangeValue: PropTypes.func
}

export default class DGCheckbox extends PureComponent<Props> {
  onRequestChangeValue = () => {
    if (this.props.onRequestChangeValue) {
      let newValue = !this.props.isChecked
      this.props.onRequestChangeValue(newValue)
    }
  }

  render() {
    let { isChecked, style, iconColor } = this.props
    let iconName = isChecked ? "checkmark-circle" : "radio-button-off"
    return(
      <TouchableWithoutFeedback 
        style={style} 
        onPress={this.props.onRequestChangeValue}
      >
        <Icon name={iconName} size={24} color={iconColor}/>
      </TouchableWithoutFeedback>
    );
  }
}