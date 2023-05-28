import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  onOpen: false,
}
export const {reducer: openDrawerReducer, actions: openDrawerAction} = createSlice({
  name: 'openDrawer',
  initialState,
  reducers: {
    openDrawer: (state, action)=>{
      state.onOpen = true;
    },
    closeDrawer: (state, action)=> {
      state.onOpen = false;
    }
  }
})