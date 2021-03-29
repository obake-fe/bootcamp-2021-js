import store from "../store.js";
import { createAddTodoAction } from "../flux/index.js";

class TodoForm {
  constructor() {
    this.button = document.querySelector(".todo-form__submit");
    this.form = document.querySelector(".todo-form__input");
  }

  mount() {
    console.log("🦈", "TodoForm mount start")
    this.button.addEventListener("click", (e) => {
      console.log("👻", "click event fire")
      e.preventDefault();
      store.dispatch(createAddTodoAction({ name: this.form.value }));
      this.form.value = "";
    });
  }
}

export default TodoForm;
