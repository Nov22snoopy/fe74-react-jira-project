import { createSlice } from "@reduxjs/toolkit";
import { createTask, getPiority, getTaskType } from "./thunkAction";
const initialState = {
  taskType: [],
  piority: [],
  isLoading: true,
  newTask:null,
}
export const {reducer: taskServiceReducer, actions: taskServiceActions} =createSlice({
  name: 'TaskService',
  initialState,
  reducers: {},
  extraReducers:(builder) =>{
    builder.addCase(getTaskType.fulfilled,(state,action)=>{
      state.taskType = action.payload
    })
    .addCase(getPiority.fulfilled,(state,action)=>{
      state.piority = action.payload
    })
    .addCase(createTask.pending, (state, actions) => {
      state.isLoading = false;
    })
    .addCase(createTask.fulfilled, (state, actions) => {
      state.isLoading = true;
      state.newTask =actions.payload
    })
    .addCase(createTask.rejected, (state, actions) => {
      state.isLoading = true;
    });
  }
})