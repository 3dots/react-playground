import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface ITimeGameState {
  name: string
}

const initialState: ITimeGameState = {
  name: "",
}

export const invCalculatorSlice = createSlice({
  name: "Investment calculator",
  initialState,
  reducers: create => ({
    setName: create.reducer((state, action: PayloadAction<string>) => {
      state.name = action.payload.trim()
    }),
  }),
  selectors: {
    selectName: state => state.name,
  },
})

export const { setName } = invCalculatorSlice.actions

export const { selectName } = invCalculatorSlice.selectors
