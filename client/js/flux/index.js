/**
 * Dispatcher
 */
class Dispatcher extends EventTarget {


  dispatch() {
    // カスタムイベントの発行
    // https://developer.mozilla.org/ja/docs/Web/API/CustomEvent/CustomEvent
    // this == Dispatcherインスタンス にカスタムイベント"event"をdispatchする
    // https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
    this.dispatchEvent(new CustomEvent("ハム太郎"));
  }

  subscribe(subscriber) {
    console.log("ほげ")
    // "event"がdispatchされたときに発火する関数、subscriber == コールバック関数を設定する
    this.addEventListener("ハム太郎", subscriber);
  }
}

const fnc = () => {
  console.log("hogehoge")
}
document.addEventListener("click", fnc)
/**
 * Action Creator and Action Types
 */
const FETCH_TODO_ACTION_TYPE = "Fetch todo list from server";

// ↓がActionCreator(ハム太郎🐹)
export const createFetchTodoListAction = () => {
  console.log("🦎", "createAction fetch todoList")

  return (
    {
      type: FETCH_TODO_ACTION_TYPE, // 手紙
      payload: undefined, // ひまわりの種
    }
  )
}

const ADD_TODO_ACTION_TYPE = "A todo addition to store";
export const createAddTodoAction = (todo) => ({
  type: ADD_TODO_ACTION_TYPE,
  payload: todo,
});

// TODO: 削除のアクションクリエイター
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

// fetchメモ
// https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch

// reducer タイショーくん⛑
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

  console.log("🐍", "createStore")

  // Dispatcher こうしくん🐮
  const dispatch = async ({ type, payload }) => {

    // console.logをグループ化
    // https://developer.mozilla.org/ja/docs/Web/API/console/group
    console.group(type);
    console.log("prev", state);
    state = await reducer(state, { type, payload });
    console.log("next", state);
    console.groupEnd();
    dispatcher.dispatch();
  };

  const subscribe = (subscriber) => {
    console.log("🐳", "subscribe start")
    dispatcher.subscribe(() => subscriber(state));
  };

  return {
    dispatch,
    subscribe,
  };
}
