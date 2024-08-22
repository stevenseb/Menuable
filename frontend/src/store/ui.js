import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isCartModalOpen: false,
  },
  reducers: {
    toggleCartModal: (state) => {
      state.isCartModalOpen = !state.isCartModalOpen;
    },
  },
});

export const { toggleCartModal } = uiSlice.actions;
export default uiSlice.reducer;
