import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { TODO_FILTER_STATUS } from '../core/Constants'
import { PASTEL_COLOR } from '../utils/colors';
import Icon from 'react-native-ionicons';
import { Body1 } from '../utils/styles';

type Props = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onRequestChangeValue: PropTypes.func
}

export default class DGSelectItem extends PureComponent<Props> {
  onRequestChangeValue = () => {
    if (this.props.onRequestChangeValue) {
      this.props.onRequestChangeValue(this.props.value)
    }
  }

  render() {
    let { isSelected, style, title } = this.props
    let additionContainerStyle = isSelected ? styles.additionSelectedItemContainer : null
    let additionTextStyle = isSelected ? styles.additionSelectedItemText : null
    return(
      <TouchableOpacity
        style={[styles.selectItemContainer, style, additionContainerStyle]} 
        onPress={this.onRequestChangeValue}
      >
        <Text style={[styles.selectItemText, additionTextStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  selectItemContainer: {
    height: 28,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginRight: 8
  },
  additionSelectedItemContainer: {
    backgroundColor: 'white'
  },
  selectItemText: {
    ...Body1,
    marginLeft: 8,
    marginRight: 8,
    color: 'white'
  },
  additionSelectedItemText: {
    color: PASTEL_COLOR.gray
  }
})