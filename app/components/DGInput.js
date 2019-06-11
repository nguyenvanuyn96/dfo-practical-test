import React, { PureComponent } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import { PASTEL_COLOR } from '../utils/colors'

type Props = {
  placeholder: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

export default class DGInput extends PureComponent<Props> {
  state = {
    text: null
  }

  getText() {
    return this.state.text;
  }

  onRequestSubmit = (event) => {
    this.setState({ text: null })

    if (this.props.onSubmit) {
      this.props.onSubmit(event.nativeEvent.text);
    }
  }

  render() {
    return(
      <View style={[styles.inputContainer, this.props.style]}>
        <TextInput
          placeholder={this.props.placeholder} 
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
          onSubmitEditing={this.onRequestSubmit}
        />
      </View>
    );
  }
}

const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  inputContainer: {
    width: windowWidth - 16 * 2,
    height: 48,
    backgroundColor: PASTEL_COLOR.orange,
    borderRadius: 8,
    paddingLeft: 12,
    paddingRight: 12,
    justifyContent: 'center'
  }
});