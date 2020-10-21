import { LitElement, html, customElement } from "lit-element";

@customElement("page-404")
class Page404 extends LitElement {
  //? state 정의 부분

  render() {
    return html`
      <style></style>
      <div>404 지렁</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "page-404": Page404;
  }
}
