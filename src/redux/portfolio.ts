import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Portfolio } from "../../types/portfolio";

interface PortfolioState {
  portfolio: Portfolio | null;
}

//* 초기 상태
const initialState: PortfolioState = {
  portfolio: null,
};

const porfolio = createSlice({
  name: "porfolio",
  initialState,
  reducers: {
    setPorfolio(state, action) {
      state.portfolio = action.payload;
    },
    //* 제목 변경하기
    setpPorfolioTitle(state, action) {},
  },
});

export const porfolioActions = { ...porfolio.actions };

export default porfolio;
