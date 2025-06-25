import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  modalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
  },
});

export const { openSidebar, closeSidebar, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
