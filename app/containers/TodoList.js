import React, { PureComponent } from 'react';
import {
  StyleSheet,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import TodoListItem from '../components/TodoListItem';
import { AppContext } from '../AppProvider';
import { TodoItem } from '../core/Types';

export default class TodoList extends PureComponent {

  keyExtractor = (item: TodoItem) => [item.id, item.name, item.status].join("-")

  renderItem = ({item}) => {
    return(
      <TodoListItem
        id={item.id}
        name={item.name}
        status={item.status}
      />
    );
  }
  
  render() {
    return(
      <FlatList
        style={styles.todoListContainer}
        keyboardShouldPersistTaps="handled" 
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        data={this.props.data}
      />
    );
  }
}

const styles = StyleSheet.create({
  todoListContainer: {
    paddingTop: 12
  }
})