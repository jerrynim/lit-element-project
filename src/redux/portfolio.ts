import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { Portfolio, PortfolioComment } from "../../types/portfolio";
import { getPorfolioCommentsAPI, getPortfolioAPI } from "../lib/api/porfolio";

interface PortfolioState {
  detail: {
    portfolio: Portfolio | null;
    loading: boolean;
    commentLoading: boolean;
  };
}

//* 초기 상태
const initialState: PortfolioState = {
  detail: {
    portfolio: null,
    loading: false,
    commentLoading: false,
  },
};

const porfolio = createSlice({
  name: "porfolio",
  initialState,
  reducers: {
    //* 포트폴리오 상세 변경하기
    setPorfolio(state, action) {
      state.detail.portfolio = action.payload;
    },

    //? 포트폴리오 상세 불러오기 async

    //* 포트폴리오 상세 불러오기 req
    getPortfolioRequest(state, action: PayloadAction<undefined>) {
      state.detail.loading = true;
    },
    //* 포트폴리오 상세 불러오기 success
    getPorfolioSuccess(state, action: PayloadAction<Portfolio>) {
      state.detail.loading = false;
      state.detail.portfolio = action.payload;
    },
    //* 포트폴리오 상세 불러오기 fail
    getPorfolioFail(state, action: PayloadAction<undefined>) {
      state.detail.loading = false;
    },

    //? 댓글 불러오기 async

    //* 포트폴리오 댓글 불러오기 req
    getPortfolioCommentsRequest(state, action: PayloadAction<undefined>) {
      state.detail.commentLoading = true;
    },
    //* 포트폴리오 댓글 불러오기 success
    getPortfolioCommentsSuccess(
      state,
      action: PayloadAction<PortfolioComment[]>
    ) {
      state.detail.commentLoading = false;
      if (state.detail.portfolio) {
        state.detail.portfolio.comments = action.payload;
      }
    },
    //* 포트폴리오 댓글 불러오기 fail
    getPortfolioCommentsFail(state, action: PayloadAction<undefined>) {
      state.detail.commentLoading = false;
    },
  },
});

export const porfolioActions = { ...porfolio.actions };

//* 포트폴리오 상세 불러오기 요청 시
function* watchGetPorfolio() {
  const {
    getPortfolioRequest,
    getPorfolioSuccess,
    getPorfolioFail,
  } = porfolioActions;
  yield takeLatest(getPortfolioRequest, function* (action) {
    try {
      const data = yield call(getPortfolioAPI);
      yield put(getPorfolioSuccess(data));
    } catch (err) {
      yield put(getPorfolioFail());
    }
  });
}

//* 포트폴리오 댓글 불러오기 요청시
function* watchGetPorfolioCommeents() {
  const {
    getPortfolioCommentsRequest,
    getPortfolioCommentsSuccess,
    getPortfolioCommentsFail,
  } = porfolioActions;
  yield takeLatest(getPortfolioCommentsRequest, function* (action) {
    try {
      const data = yield call(getPorfolioCommentsAPI);
      yield put(getPortfolioCommentsSuccess(data));
    } catch (err) {
      yield put(getPortfolioCommentsFail());
    }
  });
}

export function* porfolioSaga() {
  yield all([fork(watchGetPorfolio), fork(watchGetPorfolioCommeents)]);
}

export default porfolio;
