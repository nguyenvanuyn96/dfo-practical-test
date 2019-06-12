import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';
import CheckBox from '../components/DGCheckbox'
import { AppContext } from '../AppProvider';
import { TODO_STATUS } from '../core/TodoAppManager'
import { PASTEL_COLOR, PLAIN_COLOR } from '../utils/colors';
import { CardContent, Body1 } from '../utils/styles';
import strings from '../res/strings';

const ANIMATION_DURATION = 250;

type Props = {
  id: PropTypes.integer.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
}
export default class TodoListItem extends PureComponent<Props> {

  todoHelper = undefined;

  swipeoutBtns = {
    text: strings.delete,
    backgroundColor: PLAIN_COLOR.red,
    underlayColor: PLAIN_COLOR.red,
    onPress: () => this.onRequestDeleteRow()
  }

  constructor(props) {
    super(props);

    this.animated = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }

  onRequestDeleteRow() {
    Animated.timing(this.animated, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start(() => {
      if (this.todoHelper) {
        this.todoHelper.deleteItem(this.props.id);
      }
    });
  }

  onRequestToggleValue = () => {
    if (this.todoHelper) {
      this.todoHelper.toggleItem(this.props.id);
    }
  }

  renderContent(todoHelper) {
    this.todoHelper = todoHelper;
    let { status, name } = this.props;

    return(
      <Animated.View style={[
        { opacity: this.animated },
        { transform: [{ scale: this.animated }] }
      ]}>
        <Swipeout style={styles.todoListItemSwipteContainer} 
          right={[this.swipeoutBtns]}>
          <View style={styles.todoListItemContainer}>
            <CheckBox 
              style={styles.todoListItemCheckbox} 
              iconColor={PASTEL_COLOR.pink}
              isChecked={status == TODO_STATUS.DONE}
              onRequestChangeValue={this.onRequestToggleValue}
            />
            <Text style={styles.todoListItemName}>{name}</Text>
          </View>
        </Swipeout>
      </Animated.View>
    );
  }

  render() {
    return(
      <AppContext.Consumer>
        {({todoHelper}) => this.renderContent(todoHelper)}
      </AppContext.Consumer>
    );
  }
}

const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  todoListItemSwipteContainer: {
    backgroundColor: 'white', 
    marginBottom: 8
  },
  todoListItemContainer: {
    backgroundColor: PASTEL_COLOR.green,
    borderRadius: 8,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    ...CardContent
  },
  todoListItemCheckbox: {
    width: 14, 
    height: 14
  },
  todoListItemName: {
    flex: 1,
    marginLeft: 8,
    alignSelf: 'center',
    ...Body1
  }
});