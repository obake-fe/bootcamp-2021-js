/**
 * Dispatcher
 */
class Dispatcher extends EventTarget {
  dispatch() {
    this.dispatchEvent(new CustomEvent("event"));
  }

  subscribe(subscriber) {
    this.addEventListener("event", subscriber);
  }
}

/**
 * Action Creator and Action Types
 */
const FETCH_TODO_ACTION_TYPE = "Fetch todo list from server";
export const createFetchTodoListAction = () => ({
  type: FETCH_TODO_ACTION_TYPE,
  payload: undefined,
});

const ADD_TODO_ACTION_TYPE = "A todo addition to store";
export const createAddTodoAction = (todo) => ({
  type: ADD_TODO_ACTION_TYPE,
  payload: todo,
});

// TODO: 削除アクション
const DELETE_TODO_ACTION_TYPE = "Delete a todo list from store";
export const createDeleteTodoAction = (todo) => ({
  type: DELETE_TODO_ACTION_TYPE,
  payload: todo,
});

// TODO: 更新アクション
const PATCH_TODO_ACTION_TYPE = "patch a todo list in store";
export const createPatchTodoAction = (todo) => ({
  type: PATCH_TODO_ACTION_TYPE,
  payload: todo,
});

const CLEAR_ERROR = "Clear error from state";
export const clearError = () => ({
  type: CLEAR_ERROR,
  payload: undefined,
});

/**
 * Store Creator
 */
const api = "http://localhost:3000/todo";

const defaultState = {
  todoList: [],
  error: null,
};

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const reducer = async (prevState, { type, payload }) => {
  switch (type) {
    case FETCH_TODO_ACTION_TYPE: {
      try {
        const resp = await fetch(api).then((d) => d.json());
        return { todoList: resp.todoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case ADD_TODO_ACTION_TYPE: {
      const body = JSON.stringify(payload);
      const config = { method: "POST", body, headers };
      try {
        const resp = await fetch(api, config).then((d) => d.json());
        return { todoList: [...prevState.todoList, resp], error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    // TODO: 削除時の処理
    case DELETE_TODO_ACTION_TYPE: {
      const config = { method: "DELETE"};
      try {
        await fetch(`${api}/${payload.id}`, config)

        const resp = await fetch(api).then((d) => d.json());

        return { todoList: resp.todoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    // TODO: 更新時の処理
    case PATCH_TODO_ACTION_TYPE: {
      const body = JSON.stringify(payload);
      const config = { method: "PATCH", body, headers };
      try {
        await fetch(`${api}/${payload.id}`, config)

        const resp = await fetch(api).then((d) => d.json());

        return { todoList: resp.todoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case CLEAR_ERROR: {
      return { ...prevState, error: null };
    }
    default: {
      throw new Error("unexpected action type: %o", { type, payload });
    }
  }
};

export function createStore(initialState = defaultState) {
  const dispatcher = new Dispatcher();
  let state = initialState;

  console.log("🐍")

  const dispatch = async ({ type, payload }) => {
    console.group(type);
    console.log("prev", state);
    state = await reducer(state, { type, payload });
    console.log("next", state);
    console.groupEnd();
    dispatcher.dispatch();
  };

  const subscribe = (subscriber) => {
    console.log("🐳")
    dispatcher.subscribe(() => subscriber(state));
  };

  return {
    dispatch,
    subscribe,
  };
}
