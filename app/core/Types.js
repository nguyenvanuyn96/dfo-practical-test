import { TODO_STATUS, TODO_FILTER_STATUS } from './Constants'

export type TodoItem = {
  id: Number,
  name: String,
  status: TODO_STATUS
}

export type State = {
  todoList: Array<TodoItem>,
  filterStatus: String,
  todoHelper: Object
}