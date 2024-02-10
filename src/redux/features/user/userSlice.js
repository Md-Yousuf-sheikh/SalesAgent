import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listOpen: false,
  inPress: null,
  myData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMyData: (state, action) => {
      state.myData = action.payload;
    },
  },
});

export const { setMyData } = userSlice.actions;

export default userSlice;
