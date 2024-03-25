import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCustomers: [],
  allMetaData: {},
  selectedCustomer: null,
  selectAllCustomerUsers: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setAllCustomers: (state, action) => {
      state.allCustomers = action.payload;
      state.metaData = action.payload;
    },
    setAllCustomersUsers: (state, action) => {
      state.selectAllCustomerUsers = action.payload;
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
  },
});

export const selectAllCustomer = (state) => state?.customer?.allCustomers;
export const selectAllCustomerUsers = (state) =>
  state?.customer?.selectAllCustomerUsers;
export const selectCustomer = (state) => state?.customer?.selectedCustomer;
export const { setAllCustomers, setSelectedCustomer, setAllCustomersUsers } =
  customerSlice.actions;
export default customerSlice;
