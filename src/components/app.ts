import { router } from "lit-element-router";
import { LitElement, html, property, customElement } from "lit-element";

import "./portal-component";

@customElement("lit-app")
class LitApp extends router(LitElement) {
  render() {
    return html`
      <main></main>
      <portal-component></portal-component>
    `;
  }
}

customElements.define("lit-app", LitApp);
