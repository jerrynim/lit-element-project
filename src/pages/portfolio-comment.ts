import { LitElement, html, property, customElement, css } from "lit-element";
import { PortfolioComment as PortfolioCommentType } from "../../types/portfolio";

import { format } from "date-fns";
import "../components/lit-image";
import "./portfolio-detail-comments";
import globalStyle from "../styles/globalStyle";

const portfolioCommentCss = css`
  li {
    display: flex;
    width: 100%;
    padding: 16px 0px;
    min-height: 120px;
    border-bottom: 1px solid var(--gray_dd);
  }
  li img {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    border-radius: 50%;
  }
  .portfolio-detail-comment-createdAt {
    margin-left: 8px;
    font-size: 12px;
    color: var(--gray_dd);
  }
  .portfolio-detail-reply-comment {
    margin-left: 20px;
  }
`;

@customElement("portfolio-comment")
class PortfolioComment extends LitElement {
  //? state 정의 부분
  @property({ type: Object }) comment:
    | PortfolioCommentType
    | undefined = undefined;

  render() {
    if (!this.comment) {
      return null;
    }
    return html`
      <style>
        ${globalStyle}
        ${portfolioCommentCss}
      </style>
      <li>
        <img src=${this.comment.author.profilePhoto} />
        <div class="portfolio-detail-comment-author-texts">
          <b class="portfolio-detail-comment-author-nickname"
            >${this.comment.author.nickname}
            <span class="portfolio-detail-comment-createdAt"
              >${format(new Date(this.comment.createdAt), "yyyy.MM.dd")}</span
            >
          </b>
          <p class="portfolio-detail-comment-text">${this.comment.text}</p>
        </div>
      </li>
      ${this.comment.replies.map(
        (reply) =>
          html`<div class="portfolio-detail-reply-comment">
            <portfolio-comment .comment="${reply}"></portfolio-comment>
          </div>`
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "portfolio-comment": PortfolioComment;
  }
}
