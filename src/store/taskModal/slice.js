import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  onOpen: false,
  onOpenEdit: false
}
export const {reducer: openModalReducer, actions: openModalAction} = createSlice({
  name: 'openModal',
  initialState,
  reducers: {
    openModal: (state, action)=>{
      state.onOpen = true;
    },
    closeModal: (state, action)=> {
      state.onOpen = false;
    },
    openEditTask: (state, action) =>{
      state.onOpenEdit = true;
    },
    closeEditTask: (state, action) => {
      state.onOpenEdit = false;
    }
  }
})