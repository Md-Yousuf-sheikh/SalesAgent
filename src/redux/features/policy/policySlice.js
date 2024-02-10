import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listOpen: false,
  inPress: null,
  allCategoriesDatas: [],
  quoteForm: [{}],
  buyNowInsurance: null,
};

const policySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.allCategoriesDatas = action.payload;
    },
    setQuoteForm: (state, action) => {
      state.quoteForm = action.payload;
    },
  },
});

export const selectedPolicyCategoryList = (state) =>
  state?.policy?.allCategoriesDatas;

export const { setAllCategories, setQuoteForm } = policySlice.actions;

export default policySlice;
