import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { apiSlice } from "../api/apiSlice";
import AuthSlice from "./features/auth/authSlice";
import counterSlice from "./features/counter/counterSlice";
import languageSlice from "./features/language/languageSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import policySlice from "./features/policy/policySlice";
import userSlice from "./features/user/userSlice";
import customerSlice from "./features/customer/customerSlice";
import purchaseSlice from "./features/purchase/purchaseSlice";
import nomineeSlice from "./features/purchase/NomineeSlice";
import insuranceBuyApiSlice from "./features/InsuranceBuy/InsuranceBuyApiSlice";
import insuranceComApiSlice from "./features/insuranceCompare/insuranceComApiSlice";

const reducers = combineReducers({
  auth: AuthSlice.reducer,
  language: languageSlice.reducer,
  policy: policySlice.reducer,
  insuranceBuy: insuranceBuyApiSlice,
  insuranceCom: insuranceComApiSlice,
  user: userSlice.reducer,
  customer: customerSlice.reducer,
  purchase: purchaseSlice.reducer,
  counter: counterSlice.reducer,
  nominee: nomineeSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["language", "auth", "policy", "nominee"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
  devTools: __DEV__,
});
export let persister = persistStore(store);
export default store;
