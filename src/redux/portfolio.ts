import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { Portfolio } from "../../types/portfolio";
import { getPortfolioAPI } from "../lib/api/porfolio";

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
    setPorfolio(state, action) {
      state.detail.portfolio = action.payload;
    },
    getPortfolioRequest(state, action: PayloadAction<undefined>) {
      state.detail.loading = true;
    },
    getPorfolioSuccess(state, action: PayloadAction<Portfolio>) {
      state.detail.loading = false;
      state.detail.portfolio = action.payload;
    },
    getPorfolioFail(state, action: PayloadAction<undefined>) {
      state.detail.loading = true;
    },
    //* 제목 변경하기
    setpPorfolioTitle(state, action: PayloadAction<undefined>) {},
  },
});

export const porfolioActions = { ...porfolio.actions };

//* portfolio 불러오기
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

export function* porfolioSaga() {
  yield all([fork(watchGetPorfolio)]);
}

export default porfolio;
