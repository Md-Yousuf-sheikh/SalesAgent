import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  compareItems: [],
  compareModal: false,
};
const insuranceComApiSlice = createSlice({
  name: "insuranceCom",
  initialState,
  reducers: {
    addItemToCompare: (state, action) => {
      const itemToAdd = action.payload;
      const existingItemIndex = state.compareItems.findIndex(
        (item) => item.uid === itemToAdd.uid
      );
      const matchingItemIndex = state.compareItems.findIndex(
        (item) => item.slug === itemToAdd.slug
      );

      if (matchingItemIndex !== -1) {
        return; // Exit the function if there is already an item with the same slug
      }
      if (state.compareItems.length === 2) {
        return; // Exit the function if there are already 2 items in compareItems
      }
      if (existingItemIndex === -1) {
        state.compareItems.push(itemToAdd);
      } else {
        state.compareItems.splice(existingItemIndex, 1);
        state.compareItems.push(itemToAdd);
      }
    },
    removeItemFromCompare: (state, action) => {
      const itemToRemove = action.payload;
      const itemIndex = state.compareItems.findIndex(
        (item) => item.uid === itemToRemove
      );
      if (itemIndex !== -1) {
        state.compareItems.splice(itemIndex, 1);
      }
    },
    removeAllItems: (state, action) => {
      state.compareItems = [];
    },
    compareModal: (state, action) => {
      state.compareModal = !state.compareModal;
    },
  },
});

export const selectCompareItems = (state) => state.insuranceCom.compareItems;
export const selectCompareModel = (state) => state.insuranceCom.compareModal;

export const {
  addItemToCompare,
  removeAllItems,
  removeItemFromCompare,
  compareModal,
} = insuranceComApiSlice.actions;

export default insuranceComApiSlice.reducer;
