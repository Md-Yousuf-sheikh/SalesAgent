import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  purchaseFormInfo: {},
  personalInformation: [{}],
  detailsInformation: [],
  bankInformation: {},
  addressInformation: {},
  identityInformation: {},
  premiumCalInformation: {},
  regUserInfo: {},
  motorInformation: [{}],
  detailInfo: [],
  existingInfo: [],
  familyRecord: [],
  healthInfo: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setPurchaseFormInfo: (state, action) => {
      state.purchaseFormInfo = action.payload;
    },
    setPersonalInformation: (state, action) => {
      state.personalInformation = action.payload;
    },
    setBankInformation: (state, action) => {
      state.bankInformation = action.payload;
    },
    setAddressInformation: (state, action) => {
      state.addressInformation = action.payload;
    },
    setIdentityInformation: (state, action) => {
      state.identityInformation = action.payload;
    },
    setPremiumCalInformation: (state, action) => {
      state.premiumCalInformation = action.payload;
    },
    setRegUserInfo: (state, action) => {
      state.regUserInfo = action.payload;
    },
    setMotorInformation: (state, action) => {
      state.motorInformation = action.payload;
    },
    setDetailsInformation: (state, action) => {
      state.detailsInformation = action.payload;
    },
    setDetailInfo: (state, action) => {
      state.detailInfo = action.payload;
    },
    setExistingInfo: (state, action) => {
      state.existingInfo = action.payload;
    },
    setFamilyRecord: (state, action) => {
      state.familyRecord = action.payload;
    },
    setHealthInfo: (state, action) => {
      state.healthInfo = action.payload;
    },
  },
});

export const {
  setPurchaseFormInfo,
  setPersonalInformation,
  setBankInformation,
  setAddressInformation,
  setRegUserInfo,
  setMotorInformation,
  setDetailsInformation,
  setDetailInfo,
  setExistingInfo,
  setFamilyRecord,
  setHealthInfo,
} = purchaseSlice.actions;

export default purchaseSlice;
