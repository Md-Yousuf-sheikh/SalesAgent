import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  regMobileNo: "",
  policyId: "",
  policyType: "",
  policyHolderName: "",
  NIDCopyNominee: "",
  hospitalDischargeCertificate: "",
  physiciansPrescriptions: "",
  diagnosisReports: "",
};

const userClaimSlice = createSlice({
  name: "userClaim",
  initialState,
  reducers: {
    regMobileNo: (state, action) => {
      state.regMobileNo = action.payload;
    },
  },
});

export const { regMobileNo } = userClaimSlice.actions;

export default userClaimSlice.reducer;
