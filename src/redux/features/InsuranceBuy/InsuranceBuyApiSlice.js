import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  buyNowInsurance: {
    he: "mmm",
  },
  insuranceSlag: {},
  purchasePolicyUid: "",
  calBuyItem: {},
  renewPolicy: {},
  pendingPolicy: [],
  paymentSuccess: false,
  paymentFailed: false,
  paymentUrl: {},
};
const insuranceBuyApiSlice = createSlice({
  name: "insuranceBuy",
  initialState,
  reducers: {
    addBuyNow: (state, actions) => {
      state.buyNowInsurance = actions.payload;
    },
    addInsSlag: (state, actions) => {
      state.insuranceSlag = actions.payload;
    },
    addCalBuyItem: (state, actions) => {
      state.calBuyItem = actions.payload;
    },
    paymentSuccessState: (state, actions) => {
      state.paymentSuccess = !state.paymentSuccess;
    },
    paymentSuccessUrl: (state, actions) => {
      state.paymentUrl = actions.payload;
    },
    paymentFailedState: (state, actions) => {
      state.paymentFailed = !state.paymentFailed;
    },
    addRenewPolicy: (state, actions) => {
      state.renewPolicy = actions.payload;
    },
    addPendingPolicy: (state, actions) => {
      state.pendingPolicy = actions.payload;
    },
    addPurchasePolicyUid: (state, actions) => {
      state.purchasePolicyUid = actions.payload;
    },
    setResetItemStateData: (state, actions) => {
      state.purchasePolicyUid = undefined;
      state.calBuyItem = {};
    },
  },
});

//
export const currentBuySelector = (state) =>
  state?.insuranceBuy?.buyNowInsurance;
export const premiumCalculatorSelector = (state) =>
  state?.insuranceBuy?.calBuyItem;
export const pendingPolicySelector = (state) =>
  state?.insuranceBuy?.pendingPolicy;
export const purchasePolicyUidSelector = (state) =>
  state?.insuranceBuy?.purchasePolicyUid;
export const selectedPolicyCategory = (state) =>
  state?.insuranceBuy?.insuranceSlag;

export const {
  addBuyNow,
  addInsSlag,
  addCalBuyItem,
  paymentSuccessState,
  paymentFailedState,
  addRenewPolicy,
  addPendingPolicy,
  paymentSuccessUrl,
  addPurchasePolicyUid,
  setResetItemStateData,
} = insuranceBuyApiSlice.actions;

export default insuranceBuyApiSlice.reducer;
