import {
  LitElement,
  html,
  property,
  customElement,
  css,
  query,
} from "lit-element";
import { connect } from "pwa-helpers";
import { Portfolio, PortfolioComment } from "../../types/portfolio";
import { RootState, store } from "../redux/store";
import { until } from "lit-html/directives/until.js";
import { porfolioActions } from "../redux/portfolio";
import { guard } from "lit-html/directives/guard";
import { format } from "date-fns";
import "../components/lit-textarea";
import globalStyle from "../styles/globalStyle";
import "./portfolio-comment";
import { render } from "lit-html";

const portfolioDetailCommentsCss = css`
  .portfolio-detail-comments {
    width: 100%;
  }
  .portfolio-detail-title {
    font-size: 21px;
    margin-bottom: 12px;
  }
  .portfolio-detail-write-comment-box {
    width: 100%;
    margin-bottom: 24px;
  }

  .portfolio-detail-write-comment-button {
    background-color: var(--blue);
    padding: 6px 12px;
    border: 0;
    border-radius: 4px;
    color: white;
    float: right;
    margin-top: 12px;
    cursor: pointer;
  }
  .container {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .portfolio-detail-comments-skeleton {
    width: 100%;
  }

  .portfolio-detail-comments-skeleton
    .portfolio-detail-comments-skeleton-contents {
    width: 80%;
    height: 150px;
    margin: 20px auto;
    background-color: #f1f3f5;
  }
  .bar {
    width: 100%;
    position: absolute;
    top: 0;
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
  .portfolio-detail-comments {
    width: 100%;
    padding: 0;
    list-style: none;
  }
`;

@customElement("portfolio-detail-comments")
class PortfolioDetailComments extends connect(store)(LitElement) {
  //? state 정의 부분
  @property({ type: Array }) comments: PortfolioComment[] = [];
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: Boolean }) commentLoading: boolean = true;
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
    store.dispatch(porfolioActions.getPortfolioCommentsRequest());
  }

  setCommentText(text: string) {
    this.commentText = text;
  }

  addComment() {
    render(
      html`<div>안녕asdfasdfasdfsa</div>`,
      document.querySelector("portal-component")!
    );
  }
  render() {
    return html`
      <style>
        ${globalStyle}
        ${portfolioDetailCommentsCss}
      </style>
      <div class="portfolio-detail-comments-box">
        <div class="portfolio-detail-write-comment-box">
          <p class="portfolio-detail-title">댓글</p>
          <lit-textarea
            .value=${this.commentText}
            .onChange=${this.setCommentText}
            placeholder="이 작품에 대한 댓글을 남겨보세요."
          ></lit-textarea>
          <button
            class="portfolio-detail-write-comment-button"
            @click="${this.addComment}"
          >
            댓글작성
          </button>
        </div>

        ${this.loading || this.commentLoading
          ? html`<div class="container">
              <div class="portfolio-detail-comments-skeleton">
                <div class="portfolio-detail-comments-skeleton-contents"></div>
                <div class="portfolio-detail-comments-skeleton-contents"></div>
                <div class="portfolio-detail-comments-skeleton-contents"></div>
              </div>
              <div class="bar">
                <div class="indicator"></div>
              </div>
            </div>`
          : html`<ul class="portfolio-detail-comments">
              ${this.comments.map(
                (comment) =>
                  html`<portfolio-comment
                    .comment="${comment}"
                  ></portfolio-comment>`
              )}
            </ul>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-detail-comments": PortfolioDetailComments;
  }
}
