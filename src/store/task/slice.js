import { createSlice } from "@reduxjs/toolkit";
import { createTask, editDescription, editPriority, editStatus, editTimeTracking, getPiority, getStatus, getTaskDetail, getTaskType, removeTask, removeUserTask } from "./thunkAction";
const initialState = {
  taskType: [],
  priority: [],
  status: [],
  isLoading: true,
  newTask:null,
  taskId:null,
  taskDetail:null,
  deleteTask:null
}
export const {reducer: taskServiceReducer, actions: taskServiceActions} =createSlice({
  name: 'TaskService',
  initialState,
  reducers: {
    getTaskId:(state,actions)=>{
      state.taskId = actions.payload
    }
  },
  extraReducers:(builder) =>{
    builder.addCase(getTaskType.fulfilled,(state,action)=>{
      state.taskType = action.payload
    })
    .addCase(getPiority.fulfilled,(state,actions)=>{
      state.priority = actions.payload
    })
    .addCase(getStatus.fulfilled,(state, actions)=>{
      state.status = actions.payload
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
    })
    .addCase(getTaskDetail.fulfilled,(state,actions)=>{
      state.taskDetail = actions.payload
    })
    .addCase(editStatus.pending, (state, actions) => {
      state.isLoading = false;
    })
    .addCase(editStatus.fulfilled, (state, actions) => {
      state.isLoading = true;
      state.newTask =actions.payload
    })
    .addCase(editStatus.rejected, (state, actions) => {
      state.isLoading = true;
    })
    .addCase(editPriority.pending, (state, actions) => {
      state.isLoading = false;
    })
    .addCase(editPriority.fulfilled, (state, actions) => {
      state.isLoading = true;
      state.newTask =actions.payload
    })
    .addCase(editPriority.rejected, (state, actions) => {
      state.isLoading = true;
    })
    .addCase(removeTask.pending, (state, actions) => {
      state.isLoading = false;
    })
    .addCase(removeTask.fulfilled, (state, actions) => {
      state.isLoading = true;
      state.deleteTask =actions.payload
    })
    .addCase(removeTask.rejected, (state, actions) => {
      state.isLoading = true;
    })
    .addCase(removeUserTask.pending, (state, actions) => {
      state.isLoading = false;
    })
    .addCase(removeUserTask.fulfilled, (state, actions) => {
      state.isLoading = true;
    })
    .addCase(removeUserTask.rejected, (state, actions) => {
      state.isLoading = true;
    })
    .addCase(editDescription.pending, (state, actions) => {
      state.isLoading = false;
    })
    .addCase(editDescription.fulfilled, (state, actions) => {
      state.isLoading = true;
    })
    .addCase(editDescription.rejected, (state, actions) => {
      state.isLoading = true;
    })
    .addCase(editTimeTracking.pending, (state, actions) => {
      state.isLoading = false;
    })
    .addCase(editTimeTracking.fulfilled, (state, actions) => {
      state.isLoading = true;
    })
    .addCase(editTimeTracking.rejected, (state, actions) => {
      state.isLoading = true;
    })
  }
})