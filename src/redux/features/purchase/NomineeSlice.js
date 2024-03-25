import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInformation: null,
  nomineeInformation: null,
  memberInformation: null,
  travelInformation: null,
  deviceInformation: null,
  motorInformation: null,
  nomineeCount: 1,
  memberCount: 1,
  nomineeUserData: {},
  nomineeInfoData: {},
  totalNomineeContPercentage: 0,
};

const nomineeSlice = createSlice({
  name: "nominee",
  initialState,
  reducers: {
    setNomineeInformation: (state, action) => {
      state.nomineeInformation = action.payload;
    },
    setPersonalInformation: (state, action) => {
      state.personalInformation = action.payload;
    },
    setMemberInformation: (state, action) => {
      state.memberInformation = action.payload;
    },

    setTravelInformation: (state, action) => {
      state.travelInformation = action.payload;
    },
    setDeviceInformation: (state, action) => {
      state.deviceInformation = action.payload;
    },
    setMotorInformation: (state, action) => {
      state.motorInformation = action.payload;
    },
    nomineeIncrease: (state, action) => {
      state.nomineeCount += 1;
    },
    nomineeDecrease: (state, action) => {
      state.nomineeCount -= 1;
    },
    setNomineeCount: (state, action) => {
      state.nomineeCount = action.payload === undefined ? 1 : action.payload;
    },
    setTotalNomineeContPercentage: (state, action) => {
      state.totalNomineeContPercentage = action.payload;
    },
    setNomineeUserData: (state, action) => {
      state.nomineeUserData = action.payload;
    },
    setNomineeInfoData: (state, action) => {
      state.nomineeInfoData = action.payload;
    },
    setRestFormData: (state, action) => {
      state.personalInformation = null;
      state.nomineeInformation = null;
      state.memberInformation = null;
      state.deviceInformation = null;
      state.travelInformation = null;
      state.motorInformation = null;
    },
  },
});
//
// Selectors
const selectNomineeSlice = (state) => state.nominee; // Replace "nominee" with your slice name

export const selectNomineeInformation = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.nomineeInformation
);
export const selectPersonalInformation = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.personalInformation
);

export const selectMemberInformation = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.memberInformation
);

export const selectTravelInformation = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.travelInformation
);

export const selectDeviceInformation = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.deviceInformation
);

export const selectNomineeCount = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.nomineeCount
);

export const selectTotalNomineeContPercentage = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.totalNomineeContPercentage
);

export const selectNomineeUserData = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.nomineeUserData
);

export const selectNomineeInfoData = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.nomineeInfoData
);
export const selectMotorInfoData = createSelector(
  selectNomineeSlice,
  (nominee) => nominee.motorInformation
);

export const {
  setPersonalInformation,
  setNomineeInformation,
  setMemberInformation,
  setTravelInformation,
  setDeviceInformation,
  setMotorInformation,
  nomineeIncrease,
  nomineeDecrease,
  setNomineeUserData,
  setNomineeInfoData,
  setNomineeCount,
  setRestFormData,
} = nomineeSlice.actions;

export default nomineeSlice;
