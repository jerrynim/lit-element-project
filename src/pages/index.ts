import { LitElement, html, property, customElement } from "lit-element";
import "@vaadin/vaadin-text-field";
import "@vaadin/vaadin-button";
import "@vaadin/vaadin-checkbox";
import "@vaadin/vaadin-radio-button/vaadin-radio-button";
import "@vaadin/vaadin-radio-button/vaadin-radio-group";
import todo, { getVisibleTodosSelector, todoActions } from "../redux/todo";
import { connect } from "pwa-helpers";
import { RootState, store } from "../redux/store";
import { Todo } from "../redux/todo";

@customElement("todo-view")
class TodoView extends connect(store)(LitElement) {
  //? state 정의 부분
  @property({ type: Array }) todos: Todo[] = [];
  @property({ type: String }) filter = "";
  @property({ type: String }) task = "";

  //* 업데이트 될때 실행 된다
  //? 리덕스 값 불러오기를 이곳에서 하면 될듯
  stateChanged(state: RootState) {
    this.todos = state.todos.todos;
    this.filter = state.todos.filter;
  }
  /*
  someProperty.hasChanged
  requestUpdate
  performUpdate
  shouldUpdate
  update
  render
  firstUpdated
  updated
  updateComplete
  */

  attributeChangedCallback(name, oldvar, newvar) {
    super.attributeChangedCallback(name, oldvar, newvar);
  }

  //* DOM에 컴포넌트가 추가 될 때
  connectedCallback() {
    super.connectedCallback();

    setTimeout(() => {
      this.task = "sadfaf";
      // this.setAttribute("task", "이이이잉");
    }, 3000);
  }

  //* DOM에서 컴포넌트가 제거 될 때
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  //* 첫 업데이트 시 수행
  firstUpdated(changed) {
    super.firstUpdated(changed);
  }

  //* 업데이트 될때마다 수행
  updated(changed) {
    super.update(changed);
  }
  //* 업데이트 해야할지
  shouldUpdate(changed) {
    super.shouldUpdate(changed);
    return true;
  }

  render() {
    return html`
      <style>
        todo-view {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }

        todo-view .input-layout {
          width: 100%;
          display: flex;
        }

        todo-view .input-layout vaadin-text-field {
          flex: 1;
          margin-right: var(--spacing);
        }

        todo-view .todos-list {
          margin-top: var(--spacing);
        }

        todo-view .visibility-filters {
          margin-top: calc(4 * var(--spacing));
        }
      </style>
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Task"
          value="${this.task || ""}"
          @change="${this.updateTask}"
        ></vaadin-text-field>

        <vaadin-button theme="primary" @click="${this.addTodo}">
          Add Todo
        </vaadin-button>
      </div>
      <div class="todos-list">
        ${this.todos.map(
          (todo) => html`
            <div class="todo-item">
              <vaadin-checkbox
                ?checked="${todo.complete}"
                @change="${(e) =>
                  this.updateTodoStatus(todo, e.target.checked)}"
              >
                ${todo.task}
              </vaadin-checkbox>
            </div>
          `
        )}
      </div>

      <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
        ${Object.values(["All", "Active", "Completed"]).map(
          (filter) => html`
            <vaadin-radio-button value="${filter}"
              >${filter}</vaadin-radio-button
            >
          `
        )}
      </vaadin-radio-group>
      <vaadin-button @click="${this.clearCompleted}">
        Clear Completed
      </vaadin-button>
    `;
  }

  addTodo() {
    if (this.task) {
      store.dispatch(todoActions.addTodo(this.task));
      this.task = "";
    }
  }

  shortcutListener(e) {
    if (e.key === "Enter") {
      this.addTodo();
    }
  }

  updateTask(e) {
    this.task = e.target.value;
  }

  updateTodoStatus(updatedTodo, complete) {
    store.dispatch(todoActions.updateTodo(updatedTodo));
  }

  filterChanged(e) {
    store.dispatch(todoActions.updateFilter(e.detail.value));
  }

  clearCompleted() {
    store.dispatch(todoActions.clearCompleted());
  }

  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "todo-view": TodoView;
  }
}
