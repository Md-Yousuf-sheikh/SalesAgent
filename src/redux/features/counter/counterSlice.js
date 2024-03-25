import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  compareList: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count += 1;
    },
    decrement: (state, action) => {
      state.count -= 1;
    },
    addToCompare: (state, action) => {
      state.compareList.push(action.payload);
    },
    removeCompareItem: (state, action) => {
      state.compareList = state.compareList.filter(
        (el) => el?.slug != action.payload
      );
    },
    removeAllCompare: (state, action) => {
      state.compareList = [];
    },
  },
});

export const {
  increment,
  decrement,
  addToCompare,
  removeCompareItem,
  removeAllCompare,
} = counterSlice.actions;
export default counterSlice;
