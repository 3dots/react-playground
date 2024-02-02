import { calculateInvestmentResults } from "@/util/investment";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IInvCalculatorInputs {
  initialInvestment: number;
  annualInvestment: number;
  expectedReturn: number;
  duration: number;
}

export interface IInvCalculatorState {
  input: IInvCalculatorInputs;
}

const initialState: IInvCalculatorState = {
  input: {
    initialInvestment: 10000,
    annualInvestment: 1000,
    expectedReturn: 5,
    duration: 10,
  },
};

export const invCalculatorSlice = createSlice({
  name: "Investment calculator",
  initialState,
  reducers: create => ({
    setInitialInvestment: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.input.initialInvestment = action.payload;
      },
    ),
    setAnnualInvestment: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.input.annualInvestment = action.payload;
      },
    ),
    setExpectedReturn: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.input.expectedReturn = action.payload;
      },
    ),
    setDuration: create.reducer((state, action: PayloadAction<number>) => {
      state.input.duration = action.payload;
    }),
  }),
  selectors: {
    selectInput: state => state.input,
    selectAnnualData: state => calculateInvestmentResults(state.input),
  },
});

export const {
  setInitialInvestment,
  setAnnualInvestment,
  setExpectedReturn,
  setDuration,
} = invCalculatorSlice.actions;

export const { selectInput, selectAnnualData } = invCalculatorSlice.selectors;
