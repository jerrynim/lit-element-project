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
  textarea {
    width: 100%;
    padding: 16px;
    resize: none;
    outline: none;
    min-height: 150px;
    border-radius: 4px;
    border-color: var(--gray_dd);
    overflow: hidden;
    box-sizing: border-box;
  }
`;

@customElement("lit-textarea")
class LitTextarea extends LitElement {
  //? state 정의 부분
  @property({ type: String, attribute: true }) value: string | undefined = "";
  @property({ attribute: false }) onChange = (text: string) => {};
  @property({ type: String }) placeholder = "";

  @query("#textarea")
  textarea: HTMLTextAreaElement | null = null;

  handleOnChange(e: any) {
    this.onChange(e.target.value);
    this.value = e.target.value;
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
        placeholder="${this.placeholder}"
        .value="${this.value || ""}"
        @keyup="${this.handleOnChange}"
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lit-textarea": LitTextarea;
  }
}
