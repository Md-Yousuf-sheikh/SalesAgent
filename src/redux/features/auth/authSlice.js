import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  authen: false,
  modalTest: false,
  resetStatus: false,
  token: null,
  user: null,
  reAuthCheck: "",
  marginValue: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    successLogin: (state, action) => {
      state.authen = true;
    },
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
    },
    errorLogin: (state, action) => {
      state.authen = false;
      // AsyncStorage.clear()
      // state.modalTest = true
    },
    updateResetModal: (state, action) => {
      state.modalTest = action.payload;
      // state.resetStatus = true
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      if (action.payload) {
        state.reAuthCheck = action.payload;
      }
    },
    setMarginVal: (state, action) => {
      if (
        action.payload === "IndependentPremiumCal" ||
        action.payload === "HomeScreen"
      ) {
        state.marginValue = true;
      } else {
        state.marginValue = false;
      }
    },
  },
});

export const selectAuthUser = (state) => state?.auth?.user;
export const selectToken = (state) => state?.auth?.token;
export const selectReAuthCheck = (state) => state?.auth?.reAuthCheck;

export const {
  successLogin,
  errorLogin,
  updateResetModal,
  setCredentials,
  logOut,
  setMarginVal,
} = AuthSlice.actions;
export default AuthSlice;
