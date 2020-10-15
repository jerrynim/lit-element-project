import { LitElement, html, property, customElement } from "lit-element";
import { connect } from "pwa-helpers";
import { Portfolio } from "../../types/portfolio";
import { RootState, store } from "../redux/store";

@customElement("portfolio-detail")
class PortfolioDetail extends connect(store)(LitElement) {
  //? state 정의 부분
  @property({ type: Object }) portfolio: Portfolio | null = null;

  //* 리덕스 업데이트 될때 실행 된다
  stateChanged(state: RootState) {
    this.portfolio = state.portfolio.portfolio;
  }

  render() {
    return html`
      <style>
        portfolio-detail {
          display: block;
          max-width: 800px;
          margin: 0 auto;
        }
      </style>
      <div>안녕</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-detail": PortfolioDetail;
  }
}
