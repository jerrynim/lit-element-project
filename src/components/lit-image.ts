import { LitElement, html, property, customElement, css } from "lit-element";

const litImageCss = css`
  img {
    width: 100%;
  }
`;

@customElement("lit-image")
class LitImage extends LitElement {
  //? state 정의 부분
  @property({ type: String }) src: string | undefined;

  onLoadError(e: any) {
    this.src = "";
  }

  render() {
    return html`
      <style>
        ${litImageCss}
      </style>
      <img
        src="${this.src || ""}"
        @error="${this.onLoadError}"
      ></img>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-image": LitImage;
  }
}
