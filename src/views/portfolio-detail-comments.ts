import { LitElement, html, property, customElement, css } from "lit-element";
import { connect } from "pwa-helpers";
import { Portfolio, PortfolioComment } from "../../types/portfolio";
import { RootState, store } from "../redux/store";
import { until } from "lit-html/directives/until.js";
import { porfolioActions } from "../redux/portfolio";
import { guard } from "lit-html/directives/guard";
import { format } from "date-fns";
import "../components/lit-textarea";

const portfolioDetailCommentsCss = css`
  portfolio-detail-comments {
    width: 100%;
  }
  .container {
    width: 100%;
    max-width: 1160px;
    height: 1584px;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    height: 100vh;
    padding: 80px;
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

@customElement("portfolio-detail-comments")
class PortfolioDetailComments extends connect(store)(LitElement) {
  //? state 정의 부분
  @property({ type: Array }) comments: PortfolioComment[] = [];
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: Boolean }) commentLoading: boolean = false;
  @property({ type: String }) commentText: string = "";

  //* 리덕스 업데이트 될때 실행 된다
  stateChanged(state: RootState) {
    this.comments = state.portfolio.detail.portfolio?.comments || [];
    this.loading = state.portfolio.detail.loading;
    this.commentLoading = state.portfolio.detail.commentLoading;
  }

  //* DOM에 컴포넌트가 추가 될 때
  connectedCallback() {
    super.connectedCallback();
    store.dispatch(porfolioActions.getPortfolioRequest());
  }

  update(changed) {
    super.update(changed);
    console.log(changed);
  }

  render() {
    return html`
      <style>
        ${portfolioDetailCommentsCss}
      </style>
      <div class="portfolio-detail-comments-box">
        <lit-textarea value=${this.commentText}></lit-textarea>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-detail-comments": PortfolioDetailComments;
  }
}
