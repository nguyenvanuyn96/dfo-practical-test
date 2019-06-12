import React, { PureComponent } from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import TodoListItem from '../components/TodoListItem';
import { AppContext } from '../AppProvider';
import { TodoItem } from '../core/Types';
import STRINGS from '../res/strings';
import { Body1 } from '../utils/styles';
import { TODO_FILTER_STATUS } from '../core/TodoAppManager';

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

  renderEmpty = () => {
    return(
      <View style={styles.todoListEmptyContainer}>
        <Image
          style={styles.todoListEmptyImage}
          source={require('../res/images/empty.png')}
        />
        <AppContext.Consumer>
          {({filterStatus}) => {
            switch (filterStatus) {
              case TODO_FILTER_STATUS.DONE:
                var emptyString = STRINGS.doneEmpty;
                break;
              case TODO_FILTER_STATUS.ACTIVE:
                var emptyString = STRINGS.activeEmpty;
                break;
              default:
                var emptyString = STRINGS.allEmpty;
                break;
            }
            return <Text style={styles.todoListEmptyText} >{emptyString}</Text>
          }}
        </AppContext.Consumer>
      </View>
      
    ) 
  }
  
  render() {
    return(
      <FlatList
        style={styles.todoListContainer}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" 
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ListEmptyComponent={this.renderEmpty}
        data={this.props.data}
      />
    );
  }
}

const styles = StyleSheet.create({
  todoListContainer: {
    paddingTop: 12
  },
  todoListEmptyContainer: {
    flex: 1, 
    justifyContent: 'center'
  },
  todoListEmptyImage: {
    width: 100, 
    height: 100, 
    alignSelf: 'center'
  },
  todoListEmptyText: {
    ...Body1,
    marginTop: 8,
    alignSelf: 'center'
  }
})