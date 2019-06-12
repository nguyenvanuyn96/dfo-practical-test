import { TodoItem } from './Types';
import { 
  deleteTodo, 
  toggleAll, 
  toggleTodo, 
  addNewTodo, 
  merge,
  filter
} from './TodoListHelper';
import MongoDBManager from './MongoDBManager';
import { TODO_STATUS, TODO_FILTER_STATUS } from './Constants';

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
  mongoDbManager: MongoDBManager = undefined;

  constructor() {
    this.mongoDbManager = MongoDBManager.getInstance();
    this.todoList = [];
    this.todoDisplayList = [];
    this.observers = [];

    this.mongoDbManager.getList().then(docs => {
      if (Array.isArray(docs) && docs.length > 0) {
        this.todoList = docs[0].data;
        this.todoDisplayList = this.todoList.slice();
        this.notifyChanged();
      }
    })
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

  syncList() {
    this.todoList = merge(this.todoList, this.todoDisplayList);
    this.mongoDbManager.saveList(this.todoList)
  }

  addNewTodo(name: String) {
    this.todoDisplayList = addNewTodo(this.todoDisplayList, name);
    this.syncList();
    this.notifyChanged();
  }

  toggleTodo(id: Number) {
    this.todoDisplayList = toggleTodo(this.todoDisplayList, id);
    this.syncList();
    this.notifyChanged();
  }

  toggleAll() {
    this.todoDisplayList = toggleAll(this.todoDisplayList);
    this.syncList();
    this.notifyChanged();
  }

  deleteTodo(id: Number) {
    this.todoDisplayList = deleteTodo(this.todoDisplayList, id);
    this.todoList = deleteTodo(this.todoList, id);
    this.mongoDbManager.saveList(this.todoList)
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