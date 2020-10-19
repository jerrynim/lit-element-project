import { te } from "date-fns/locale";
import {
  LitElement,
  html,
  property,
  customElement,
  css,
  query,
} from "lit-element";
import pallete from "../styles/pallete";

const litTextareaCss = css`
  lit-textarea {
    width: 100%;
  }
  textarea {
    width: 100%;
    padding: 16px;
    resize: none;
    outline: none;
    min-height: 120px;
    border-radius: 4px;
    border-color: var(--gray_dd);
    overflow: hidden;
    box-sizing: border-box;
  }
`;

@customElement("lit-textarea")
class LitTextarea extends LitElement {
  //? state 정의 부분
  @property({ type: String }) value: string | undefined = "";

  @query("#textarea")
  textarea: HTMLTextAreaElement | null = null;

  update(changed) {
    super.update(changed);
    console.log(changed);
  }

  handleOnChange(e: any) {
    this.value = e.currentTarget.value;
    const offset = this.textarea!.offsetHeight - this.textarea!.clientHeight;
    this.textarea!.style.height = "auto";
    this.textarea!.style.height = this.textarea!.scrollHeight + offset + "px";
  }

  render() {
    return html`
      <style>
        ${litTextareaCss}
      </style>
      <textarea
        id="textarea"
        src="${this.value || ""}"
        @input="${this.handleOnChange}"
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-textarea": LitTextarea;
  }
}
