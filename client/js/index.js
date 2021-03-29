import { createFetchTodoListAction, clearError } from "./flux/index.js";
import store from "./store.js";
import TodoList from "./components/todo-list.js";
import TodoForm from "./components/todo-form.js";

new TodoForm().mount();

console.log("🐧", "TodoForm mount finish")

store.subscribe((state) => {
  console.log("🐩", "fire subscriber")
  if (state.error == null) {
    console.log("🦕", "rendering view")
    const parent = document.querySelector(".todo-list__wrapper");
    new TodoList(parent, { todoList: state.todoList }).render();
  } else {
    console.error(state.error);
    alert(state.error);
    store.dispatch(clearError());
  }
});

console.log("🦋",  "subscribe setting finish")

store.dispatch(createFetchTodoListAction());
