import React, { PureComponent } from 'react';
import {
  Keyboard,
  StyleSheet, 
  View,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import DGSelectItem from '../components/DGSelectItem';
import STRINGS from '../res/strings'
import { TODO_FILTER_STATUS } from '../core/TodoAppManager'
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { AppContext } from '../AppProvider';
import { PASTEL_COLOR } from '../utils/colors';
import { TodoItem } from '../core/Types';
import { CardContent } from '../utils/styles';

const FILTER_MODEL = [
  {
    title: STRINGS.all,
    value: TODO_FILTER_STATUS.NONE
  },
  {
    title: STRINGS.done,
    value: TODO_FILTER_STATUS.DONE
  },
  {
    title: STRINGS.active,
    value: TODO_FILTER_STATUS.ACTIVE
  }
]

export default class Filter extends PureComponent {  

  todoHelper = undefined

  onRequestFilter = (newStatus: String) => {
    this.todoHelper.filter(newStatus);
  }

  renderFilterList(filterStatus: TODO_FILTER_STATUS) {
    return FILTER_MODEL.map(f => {
      return(
        <DGSelectItem
          key={"filter" + f.value}
          title={f.title} 
          value={f.value}
          isSelected={filterStatus == f.value}
          onRequestChangeValue={this.onRequestFilter}
          />
      );
    });
  }

  renderContent(filterStatus: TODO_FILTER_STATUS, todoHelper) {
    this.todoHelper = todoHelper

    return(
      <View style={styles.filterContainer}>
        {this.renderFilterList(filterStatus)}
      </View>
    );
  }

  render() {
    return(
      <AppContext.Consumer>
        {({filterStatus, todoHelper}) => this.renderContent(filterStatus, todoHelper)}
      </AppContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  filterContainer: {
    ...CardContent,
    height: getBottomSpace() + 80,
    backgroundColor: PASTEL_COLOR.gray,
    flexDirection: 'row'
  }
})