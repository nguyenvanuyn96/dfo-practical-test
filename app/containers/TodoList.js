import React, { PureComponent } from 'react';
import {
  Keyboard,
  StyleSheet, 
  View,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { AppContext } from '../AppProvider';
import TodoListItem from '../components/TodoListItem';

export default class TodoList extends PureComponent {

  keyExtractor = (item) => item.id.toString()

  renderItem = ({item}) => {
    return(
      <TodoListItem
        id={item.id}
        name={item.name}
        status={item.status}
      />
    );
  }

  renderList(data) {
    return(
      <FlatList
        style={styles.todoListContainer}
        keyboardShouldPersistTaps="handled" 
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        data={data}
      />
    );
  }
  render() {
    return <AppContext.Consumer>{({todoList}) => this.renderList(todoList)}</AppContext.Consumer>
  }
}

const styles = StyleSheet.create({
  todoListContainer: {
    paddingTop: 12
  }
})