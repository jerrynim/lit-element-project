import {
  LitElement,
  html,
  property,
  customElement,
  css,
  svg,
} from "lit-element";
import { connect } from "pwa-helpers";
import { unsafeSVG } from "lit-html/directives/unsafe-svg";
import { Portfolio } from "../../types/portfolio";
import { RootState, store } from "../redux/store";
import { until } from "lit-html/directives/until.js";
import { porfolioActions } from "../redux/portfolio";
import { guard } from "lit-html/directives/guard";
import { format } from "date-fns";
import "../components/lit-image";
import "./portfolio-detail-comments";
import globalStyle from "../styles/globalStyle";
import MNLogo from "../../public/statics/svgs/logo_header.svg";

const portfolioDetailCss = css`
  .portfolio-detail-header {
    display: flex;
    align-items: center;
    padding: 0 80px;
    position: sticky;
    top: 0;
    background-color: white;
    opacity: 0.9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
    height: 60px;
  }
  .portfolio-detail-contents {
    max-width: 1160px;
    margin: auto;
    margin-bottom: 80px;
  }
  @media only screen and (max-width: 1024px) {
    .portfolio-detail-contents {
      padding: 0 20px;
    }
  }
  .portfolio-detail-title {
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0;
  }
  .portfolio-detail-photos {
    width: 100%;
  }
  .portfolio-detail-photos img {
    width: 100%;
  }

  .portfolio-detail-description {
    max-width: 1160px;
    margin: auto;
    white-space: break-spaces;
    text-align: center;
  }
  .container {
    width: 100%;
    max-width: 1160px;
    height: 1584px;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    height: 100vh;
    padding: 80px 0;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .list {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(#f1f3f5 172px, transparent 0),
      linear-gradient(#f1f3f5 16px, transparent 0),
      linear-gradient(#f1f3f5 10px, transparent 0),
      linear-gradient(#f1f3f5 10px, transparent 0),
      linear-gradient(#f1f3f5 28px, transparent 0),
      linear-gradient(#f1f3f5 14px, transparent 0),
      linear-gradient(#f1f3f5 8px, transparent 0),
      linear-gradient(#f1f3f5 14px, transparent 0),
      linear-gradient(#f1f3f5 8px, transparent 0);
    background-repeat: repeat-y;
    background-size: 100% 304px, 180px 304px, 90px 304px, 32px 304px, 28px 304px,
      40px 304px, 56px 304px, 112px 304px, 89px 304px;
    background-position: 0px 0px, 0px 188px, 0px 214px, 98px 214px, 0px 244px,
      36px 244px, 36px 264px, 231px 244px, 254px 264px;
  }

  .bar {
    width: 100%;
    position: absolute;
    animation-name: skeleton;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
  }

  .indicator {
    width: 0;
    box-shadow: 0 0 75px 75px white;
  }

  .bar,
  .indicator {
    height: 100vh;
  }

  @keyframes skeleton {
    0% {
      transform: translateX(0);
      opacity: 0;
    }

    20% {
      opacity: 0.25;
    }

    50% {
      opacity: 1;
    }

    80% {
      opacity: 0.5;
    }

    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

@customElement("portfolio-detail")
class PortfolioDetail extends connect(store)(LitElement) {
  //? state 정의 부분
  @property({ type: Object }) portfolio: Portfolio | null = null;
  @property({ type: Boolean }) loading: boolean = false;

  //* 리덕스 업데이트 될때 실행 된다
  stateChanged(state: RootState) {
    this.portfolio = state.portfolio.detail.portfolio;
    this.loading = state.portfolio.detail.loading;
  }

  //* DOM에 컴포넌트가 추가 될 때
  connectedCallback() {
    super.connectedCallback();
    store.dispatch(porfolioActions.getPortfolioRequest());
  }

  render() {
    return html`
      <style>
        ${globalStyle}
        ${portfolioDetailCss}
      </style>
      <div class="portfolio-detail-header">${MNLogo}</div>

      <div class="portfolio-detail-contents">
        <div class="portfolio-detail-title">${this.portfolio?.title}</div>
        <div class="portfolio-detail-createdAt">
          ${this.portfolio?.createdAt
            ? format(new Date(this.portfolio.createdAt), "yyyy.MM.dd")
            : undefined}
        </div>
        ${guard([this.portfolio, this.loading], () => {
          return html`${!this.loading && this.portfolio
            ? html`<div class="portfolio-detail-photos">
                  ${this.portfolio?.photos.map(
                    (photo) => html`<lit-image src="${photo}" />`
                  )}
                </div>
                <p class="portfolio-detail-description">
                  ${this.portfolio?.description}
                </p>`
            : html`<div class="container">
                <div class="bar">
                  <div class="indicator"></div>
                </div>
                <div class="wrapper">
                  <div class="list"></div>
                </div>
              </div>`}`;
        })}

        <portfolio-detail-comments></portfolio-detail-comments>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-detail": PortfolioDetail;
  }
}
