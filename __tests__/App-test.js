/**
 * @format
 */

import 'react-native';
import React from 'react';
import { addNewTodo, deleteTodo, toggleTodo, toggleAll } from '../app/core/TodoListHelper';
import { TODO_FILTER_STATUS } from '../app/core/Constants';

describe('Test TodoListHelper Logic', function() {
  it('add to empty list', function() {
    let source = [];
    let itemToAdd = "ducgao";
    let result = addNewTodo(source, itemToAdd);
    let expected = [{ id: 0, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE }]
    expect(result).toEqual(expected);
  });
  it('add to non empty list', function() {
    let source = [{ id: 101, name: "ducgao", status: TODO_FILTER_STATUS.DONE }];
    let itemToAdd = "ducgaogao";
    let result = addNewTodo(source, itemToAdd);
    let expected = [
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.DONE },
    ]
    expect(result).toEqual(expected);
  });
  it('delete from list', function() {
    let source = [
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.DONE },
    ]
    let itemToDelete = 101;
    let result = deleteTodo(source, itemToDelete);
    let expected = [{ id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE }];
    expect(result).toEqual(expected);
  });
  it('toggle item in list', function() {
    let source = [
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.DONE },
    ]
    let itemToToggle = 101;
    let result = toggleTodo(source, itemToToggle);
    let expected = [
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE },
    ]
    expect(result).toEqual(expected);
  });
  it('toggle all list', function() {
    let source = [
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.DONE },
    ]
    let result = toggleAll(source);
    let expected = [
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE },
    ]
    expect(result).toEqual(expected);
  });
});

