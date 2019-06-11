import React, { PureComponent } from 'react';
import {
  Keyboard,
  StyleSheet, 
  View,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import AppProvider, { AppContext } from '../AppProvider';
import STRINGS from '../res/strings';
import DGInput from '../components/DGInput';
import TodoList from '../containers/TodoList';

export default class Home extends PureComponent {

  todoHelper = undefined;

  onRequestSubmitTodoName = (name: String) => {
    if (this.todoHelper) {
      this.todoHelper.addTodo(name);
    }
    Keyboard.dismiss();
  }

  renderContent(context) {
    this.todoHelper = context.todoHelper;

    return(
      <View style={styles.homeContainer}>
        <DGInput 
          style={styles.todoInput} 
          placeholder={STRINGS.todoPlaceHolder}
          onSubmit={this.onRequestSubmitTodoName}
        />
        <TodoList 
          data={context.todoList}
        />  
      </View>
    );
  }

  render() {
    return (
      <AppProvider title={STRINGS.appName}>
        <AppContext.Consumer>
          {(context) => this.renderContent(context)}
        </AppContext.Consumer>
      </AppProvider>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1
  },
  todoInput: {
    alignSelf: 'center',
    marginTop: 12
  }
});
