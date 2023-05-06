import { createSlice } from '@reduxjs/toolkit'

type PageCounter = {
  pageCounter: number,
};

const initialState: PageCounter = {
  pageCounter: 1,
};

export const pageCounterSlice = createSlice({
  name: 'pageConuter',
  initialState,
  reducers: {
    setCounterPage: (state, action) => {
      state.pageCounter = action.payload;
    }
  }
})


export const { setCounterPage } = pageCounterSlice.actions;
export default pageCounterSlice.reducer;