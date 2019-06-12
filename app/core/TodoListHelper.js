import { TodoItem } from './Types';
import { TODO_STATUS, TODO_FILTER_STATUS } from './TodoAppManager';
import lodash from 'lodash';
import { functionTypeAnnotation } from '@babel/types';

export function addNewTodo(list: Array<TodoItem>, name: String): Array {
  let maxIdObject = lodash.maxBy(list, 'id')
  if (maxIdObject) {
    return [
      ...list,
      {
        id: maxIdObject.id + 1,
        name,
        status: TODO_STATUS.ACTIVE
      }
    ]
  }
  else {
    return [{
      id: 0,
      name,
      status: TODO_STATUS.ACTIVE
    }]
  }
}

export function toggleTodo(list: Array<TodoItem>, id: Number): Array {
  return list.map(t => {
    if (t.id == id) {
      return {
        ...t,
        status: t.status == TODO_STATUS.DONE ? TODO_STATUS.ACTIVE : TODO_STATUS.DONE
      }
    }

    return t;
  })
}

export function toggleAll(list: Array<TodoItem>): Array {
  return list.map(t => {
    return {
      ...t,
      status: t.status == TODO_STATUS.DONE ? TODO_STATUS.ACTIVE : TODO_STATUS.DONE
    }
  });
}

export function deleteTodo(list: Array<TodoItem>, id: Number): Array {
  return list.filter(t => t.id != id);
}

export function filter(list: Array<TodoItem>, status: TODO_FILTER_STATUS) {
  return list.filter(t => t.status == status)
}

export function merge(listA: Array<TodoItem>, listB: Array<TodoItem>): Array {
  return lodash.unionBy([...listA, ...listB], 'id').map(t => {
    let matchedItem = lodash.find(listB, ['id', t.id])
    return matchedItem ? matchedItem : t
  })
}