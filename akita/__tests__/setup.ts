import { EntityStore, getInitialActiveState } from '../src/api/entity-store';
import { ActiveState, EntityState, ID } from '../src/api/types';

export class Todo {
  id: ID;
  title?: string;
  completed? = false;

  constructor(params: Todo) {
    Object.assign(this, params);
    if (!params.title) {
      this.title = params.id.toString();
    }
  }
}

export interface State extends EntityState<Todo>, ActiveState {
  metadata?: { name: string };
}

export const initialState: State = {
  ...getInitialActiveState(),
  metadata: { name: 'metadata' }
};

export class TodosStore extends EntityStore<State, Todo> {
  constructor() {
    super(initialState);
  }
}

export type TodoCustomID = {
  todoId: ID;
  title?: string;
  completed?;
};

export interface StateTwo extends EntityState<TodoCustomID> {}

export class TodosStoreCustomID extends EntityStore<StateTwo, TodoCustomID> {
  constructor() {
    super(initialState, { idKey: 'todoId' });
  }
}

export function createTodos(len) {
  const arr = [];
  const factory = ct();
  for (var i = 0; i < len; i++) {
    arr.push(factory());
  }
  return arr;
}

export function ct() {
  let count = 0;
  return function() {
    const id = count++;
    return {
      id,
      title: `Todo ${id}`,
      complete: false
    };
  };
}

export function cot() {
  return {
    id: 1,
    title: `Todo ${1}`,
    complete: false
  } as Todo;
}
