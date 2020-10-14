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
  @property({ type: Array }) todos: Todo[] = [];
  @property({ type: String }) filter = "";
  @property({ type: String }) task = "";

  //* 업데이트 될때 실행 된다
  stateChanged(state: RootState) {
    this.todos = state.todos.todos;
    this.filter = state.todos.filter;
  }

  render() {
    return html`
      <div>
        <todo-view />
      </div>
    `;
  }
}
