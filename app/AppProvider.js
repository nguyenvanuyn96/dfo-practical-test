import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { PASTEL_COLOR } from './utils/colors';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Heading1, Heading2, Body1 } from './utils/styles';
import PropTypes from 'prop-types';

export const TODO_STATUS = {
  DONE: "done",
  ACTIVE: "active"
}

const DEFAULT_STATE = {
  todoList: [
    {
      id: 0,
      name: "I need to buy something that required to my new case of nintendo switch",
      status: TODO_STATUS.DONE
    },
    {
      id: 1,
      name: "Todo 2",
      status: TODO_STATUS.DONE
    },
    {
      id: 2,
      name: "Todo 3",
      status: TODO_STATUS.ACTIVE
    }
  ],
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
    todoHelper: {
      addTodo: (name: String) => this.addTodo(name),
      toggleItem: (id: Number) => this.toggleItem(id),
      deleteItem: (id: Number) => this.deleteItem(id)
    }
  }

  addTodo(name: String) {
    let newList = [...this.state.todoList, { id: 123, name, status: TODO_STATUS.ACTIVE }];
    this.setState({ 
      todoList: newList
    });
  }

  toggleItem(id: Number) {
    let newList = this.state.todoList.map(i => {
      if (i.id == id) {
        return {
          ...i,
          status: i.status == TODO_STATUS.DONE ? TODO_STATUS.ACTIVE : TODO_STATUS.DONE
        }
      }

      return i;
    });

    this.setState({ 
      todoList: newList
    });
  }

  deleteItem(id: Number) {
    let newList = this.state.todoList.filter(i => {
      return i.id != id;
    })

    this.setState({ 
      todoList: newList
    });
  }

  toggleAll = () => {
    let newList = this.state.todoList.map(i => {
      return {
        ...i,
        status: i.status == TODO_STATUS.DONE ? TODO_STATUS.ACTIVE : TODO_STATUS.DONE
      }
    });

    this.setState({ 
      todoList: newList
    });
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
  }
});