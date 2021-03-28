import store from "../store.js";
import {createDeleteTodoAction, createPatchTodoAction} from "../flux/index.js";

class Todo {
  constructor(parent, { id, name, done }) {
    this.parent = parent;
    this.props = { id, name, done };
    this.mounted = false;
  }

  mount() {
    if (this.mounted) return;

    // TODO: ここにTODOの削除ボタンが押されたときの処理を追記
    const deleteButton = this.element.querySelector(".todo-remove-button")
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      store.dispatch(createDeleteTodoAction({ id: this.props.id}));
      this.element.remove();
    })

    // TODO: ここにTODOのチェックボックスが押されたときの処理を追記
    const checkbox = this.element.querySelector(".todo-toggle")
    checkbox.addEventListener("click", (e) => {
      e.preventDefault();
      store.dispatch(createPatchTodoAction({...this.props, done: !this.props.done}))
    })

    this.mounted = true;
  }

  render() {
    const { id, name, done } = this.props;
    const next = document.createElement("li");
    next.className = "todo-item";
    next.innerHTML = `
      <label class="todo-toggle__container">
        <input
          data-todo-id="${id}"
          type="checkbox"
          class="todo-toggle"
          value="checked"
          ${done ? "checked" : ""}
        />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name">${name}</div>
      <div data-todo-id="${id}" class="todo-remove-button">x</div>
    `;
    if (!this.element) {
      this.parent.appendChild(next);
    } else {
      this.parent.replaceChild(this.element, next);
    }
    this.element = next;
    this.mount();
  }
}

export default Todo;
