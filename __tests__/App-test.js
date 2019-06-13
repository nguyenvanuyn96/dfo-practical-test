/**
 * @format
 */

import 'react-native';
import React from 'react';
import { addNewTodo, deleteTodo, toggleTodo, toggleAll, filter, merge } from '../app/core/TodoListHelper';
import { TODO_FILTER_STATUS } from '../app/core/Constants';
import TodoAppManager from '../app/core/TodoAppManager'

const todoAppManager = TodoAppManager.getInstance();

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
  it('filter done', function() {
    let source = [
      { id: 104, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 103, name: "ducgaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.DONE },
    ]
    let result = filter(source, TODO_FILTER_STATUS.DONE);
    let expected = [
      { id: 103, name: "ducgaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.DONE },
    ]
    expect(result).toEqual(expected);
  });
  it('filter active', function() {
    let source = [
      { id: 104, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 103, name: "ducgaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 101, name: "ducgao", status: TODO_FILTER_STATUS.DONE },
    ]
    let result = filter(source, TODO_FILTER_STATUS.ACTIVE);
    let expected = [
      { id: 104, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 102, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
    ]
    expect(result).toEqual(expected);
  });
  it('merge 2 list', function() {
    let listA = [{ id: 0, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE }];
    let listB = [
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE }
    ]

    let result = merge(listA, listB);
    expect(result).toEqual(listB);
  });
});

describe('Test TodoAppManager Logic', function() {
  it('add to empty list', function() {
    todoAppManager.addNewTodo("ducgao");
    let display = todoAppManager.todoDisplayList
    let baseList = todoAppManager.todoList

    let expected = [{ id: 0, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE }]

    expect(display).toEqual(expected);
    expect(baseList).toEqual(expected);
  });
  it('add to non empty list', function() {
    todoAppManager.addNewTodo("ducgaogao");
    todoAppManager.addNewTodo("ducgaogaogao");
    todoAppManager.addNewTodo("ducgaogaogaogao");
    todoAppManager.addNewTodo("ducgaogaogaogaogao");
    let display = todoAppManager.todoDisplayList
    let baseList = todoAppManager.todoList

    let expected = [
      { id: 4, name: "ducgaogaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 3, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 2, name: "ducgaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE }
    ]

    expect(display).toEqual(expected);
    expect(baseList).toEqual(expected);
  });
  it('delete item in list', function() {
    todoAppManager.deleteTodo(2);
    let display = todoAppManager.todoDisplayList
    let baseList = todoAppManager.todoList

    let expected = [
      { id: 4, name: "ducgaogaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 3, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE }
    ]
    expect(display).toEqual(expected);
    expect(baseList).toEqual(expected);
  });
  it('toggle an item', function() {
    todoAppManager.toggleTodo(1);
    todoAppManager.toggleTodo(3);

    let display = todoAppManager.todoDisplayList;
    let baseList = todoAppManager.todoList;

    let expected = [
      { id: 4, name: "ducgaogaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 3, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.ACTIVE }
    ]
    expect(display).toEqual(expected);
    expect(baseList).toEqual(expected);
  });
  it('toggle all', function() {
    todoAppManager.toggleAll();

    let display = todoAppManager.todoDisplayList;
    let baseList = todoAppManager.todoList;

    let expected = [
      { id: 4, name: "ducgaogaogaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 3, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.DONE }
    ]

    expect(display).toEqual(expected);
    expect(baseList).toEqual(expected);
  });
  it('filter done', function() {
    todoAppManager.filter(TODO_FILTER_STATUS.DONE);
    let display = todoAppManager.todoDisplayList
    let baseList = todoAppManager.todoList

    let expectedDisplay = [
      { id: 4, name: "ducgaogaogaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.DONE }
    ]
    let expectedBaseList = [
      { id: 4, name: "ducgaogaogaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 3, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.DONE }
    ]

    expect(display).toEqual(expectedDisplay);
    expect(baseList).toEqual(expectedBaseList);
  });
  it('filter active', function() {
    todoAppManager.filter(TODO_FILTER_STATUS.ACTIVE);
    let display = todoAppManager.todoDisplayList
    let baseList = todoAppManager.todoList

    let expectedDisplay = [
      { id: 3, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE }
    ]
    let expectedBaseList = [
      { id: 4, name: "ducgaogaogaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 3, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.DONE }
    ]

    expect(display).toEqual(expectedDisplay);
    expect(baseList).toEqual(expectedBaseList);
  });
  it('clear filter', function() {
    todoAppManager.filter(TODO_FILTER_STATUS.NONE)
    let display = todoAppManager.todoDisplayList
    let baseList = todoAppManager.todoList

    let expected = [
      { id: 4, name: "ducgaogaogaogaogao", status: TODO_FILTER_STATUS.DONE },
      { id: 3, name: "ducgaogaogaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 1, name: "ducgaogao", status: TODO_FILTER_STATUS.ACTIVE },
      { id: 0, name: "ducgao", status: TODO_FILTER_STATUS.DONE }
    ]
    

    expect(display).toEqual(expected);
    expect(baseList).toEqual(expected);
  });
});

