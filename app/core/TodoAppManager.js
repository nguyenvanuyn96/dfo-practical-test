import { TodoItem } from './Types'
import { 
  deleteTodo, 
  toggleAll, 
  toggleTodo, 
  addNewTodo, 
  merge,
  filter
} from './TodoListHelper'

export const TODO_STATUS = {
  DONE: "done",
  ACTIVE: "active"
}

export const TODO_FILTER_STATUS = {
  NONE: "none",
  DONE: "done",
  ACTIVE: "active"
}

export default class TodoAppManager {
  static instance = undefined

  static getInstance(): TodoAppManager {
    if (this.instance == undefined) {
      this.instance = new TodoAppManager()
    }

    return this.instance;
  }

  todoList: Array = undefined;
  todoDisplayList: Array = undefined;
  observers: Array = undefined;

  constructor() {
    this.todoList = [];
    this.todoDisplayList = [];
    this.observers = [];
  }

  addTodoListObserver(observer: Object) {
    this.observers.push(observer);
    observer(this.todoList);
  }

  removeTodoListObserver(observer: Object) {
    let index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  notifyChanged() {
    this.observers.forEach(o => o(this.todoDisplayList));
  }

  addNewTodo(name: String) {
    this.todoDisplayList = addNewTodo(this.todoDisplayList, name);
    this.todoList = merge(this.todoList, this.todoDisplayList);
    this.notifyChanged();
  }

  toggleTodo(id: Number) {
    this.todoDisplayList = toggleTodo(this.todoDisplayList, id);
    this.todoList = merge(this.todoList, this.todoDisplayList);
    this.notifyChanged();
  }

  toggleAll() {
    this.todoDisplayList = toggleAll(this.todoDisplayList);
    this.todoList = merge(this.todoList, this.todoDisplayList);
    this.notifyChanged();
  }

  deleteTodo(id: Number) {
    this.todoDisplayList = deleteTodo(this.todoDisplayList, id);
    this.todoList = merge(this.todoList, this.todoDisplayList);
    this.notifyChanged();
  }

  filter(status: String) {
    if (status == TODO_FILTER_STATUS.NONE) {
      this.todoDisplayList = this.todoList;  
    }
    else {
      this.todoDisplayList = filter(this.todoList, status)
    }
    
    this.notifyChanged()
  }
}