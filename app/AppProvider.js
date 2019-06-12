import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import TodoAppManager from './core/TodoAppManager';
import Toast from 'react-native-toast-native';
import { TODO_STATUS } from './core/Constants';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Heading1, Heading2, Body1 } from './utils/styles';
import { PASTEL_COLOR } from './utils/colors';
import { State, TodoItem } from './core/Types';
import { TODO_FILTER_STATUS } from './core/Constants'
import STRINGS from './res/strings';

const DEFAULT_STATE: State = {
  todoList: undefined,
  filterStatus: undefined,
  todoHelper: {
    addTodo: undefined,
    toggleItem: undefined,
    deleteItem: undefined
  }
}

export const AppContext = React.createContext(DEFAULT_STATE);

type Props = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default class AppProvider extends Component<Props> {
  state = {
    ...DEFAULT_STATE,
    filterStatus: TODO_FILTER_STATUS.NONE,
    todoHelper: {
      addTodo: (name: String) => this.addTodo(name),
      toggleItem: (id: Number) => this.toggleItem(id),
      deleteItem: (id: Number) => this.deleteItem(id),
      filter: (status: String) => this.filter(status)
    }
  }

  todoAppManager = TodoAppManager.getInstance();

  componentDidMount() {
    this.todoAppManager.addTodoListObserver(this.onTodoListChanged)
  }

  componentWillUnmount() {
    this.todoAppManager.removeTodoListObserver(this.onTodoListChanged)
  }

  onTodoListChanged = (todoList) => {
    this.setState({ todoList })
  }

  addTodo(name: String) {
    if (this.state.filterStatus == TODO_FILTER_STATUS.DONE) {
      this.filter(TODO_FILTER_STATUS.NONE);
      Toast.show(STRINGS.requireMoveToAllFilter, Toast.SHORT, Toast.BOTTOM, styles.toast);
    }
    this.todoAppManager.addNewTodo(name);
  }

  toggleItem(id: Number) {
    this.todoAppManager.toggleTodo(id);
    this.refreshDisplayList()
  }

  deleteItem(id: Number) {
    this.todoAppManager.deleteTodo(id);
  }

  filter(filterStatus: String) {
    this.setState({ filterStatus })
    this.todoAppManager.filter(filterStatus);
  }

  toggleAll = () => {
    this.todoAppManager.toggleAll();
    this.refreshDisplayList()
  }

  refreshDisplayList() {
    let { filterStatus } = this.state
    if (filterStatus != TODO_FILTER_STATUS.NONE) {
      this.todoAppManager.filter(filterStatus);
    }
  }

  renderHeader() {
    let { title } = this.props
    return <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
      <TouchableOpacity onPress={this.toggleAll}><Text style={styles.action}>{"Toggle all"}</Text></TouchableOpacity>
    </View>
  }

  render() {
    return <AppContext.Provider value={this.state}>
      {this.renderHeader()}
      {this.props.children}
    </AppContext.Provider>
  }
}

const statusBarHeight = getStatusBarHeight()
const styles = StyleSheet.create({
  headerContainer: {
    height: statusBarHeight + 56,
    paddingTop: statusBarHeight + 26,
    backgroundColor: PASTEL_COLOR.blue,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  header: {
    ...Heading2,
    flex: 1,
    marginLeft: 16
  },
  action: {
    ...Heading1,
    marginRight: 16
  },
  toast: {
    width: 160,
    height: 28,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4
  }
});