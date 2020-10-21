import { LitElement, html, property, customElement, css } from "lit-element";
import { render } from "lit-html";

const portalComponentStyle = css`
  .portal-component-background {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
  }
  @keyframes popup-down-animation {
    from {
      margin-top: 0px;
    }
    to {
      margin-top: 100px;
    }
  }

  ::-webkit-scrollbar {
    display: none;
    height: 0;
    width: 0;
  }
  .popup-content-wrapper {
    border-radius: 3px;
    background-color: white;
    position: relative;
    min-width: 456px;
    height: 300px;
    transition: 0.3s;
    margin-top: 0;
    margin-top: 100px;

    animation: popup-down-animation 0.3s;
  }

  .popup-close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 30;
    cursor: pointer;
  }
`;

@customElement("portal-component")
class PortalComponent extends LitElement {
  @property({ type: Boolean }) isSlotEmpty = false;

  onChangeSlot(e: any) {
    if (!e.target.assignedElements().length) {
      this.isSlotEmpty = false;
    } else {
      this.isSlotEmpty = true;
    }
  }

  closePortal() {
    render(html``, document.querySelector("portal-component")!);
  }

  render() {
    return html`
      <style>
        ${portalComponentStyle}
      </style>
      ${!this.isSlotEmpty
        ? html` <slot @slotchange="${this.onChangeSlot}"></slot> `
        : html`<div
            class="portal-component-background"
            @click="${this.closePortal}"
          >
            <div class="popup-content-wrapper">
              <slot @slotchange="${this.onChangeSlot}"></slot>
            </div>
          </div>`}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "portal-component": PortalComponent;
  }
}
