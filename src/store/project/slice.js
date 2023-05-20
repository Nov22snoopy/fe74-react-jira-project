import { createSlice } from "@reduxjs/toolkit";
import {createProjectAuthorize, deleteProject, getProjectCategory, getProjectDetail, getProjectList, updateProject } from "./thunkAction";

const initialState = {
  projectList: [],
  projectCategories: [],
  newProject: null,
  projectDetail: null,
  isDeleting: true
};
export const {
  reducer: projectServiceReducer,
  actions: projectServiceActions,
} = createSlice({
  name: "ProjectService",
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler
      .addCase(getProjectList.fulfilled, (state, actions) => {
        state.projectList = actions.payload;
      })
      .addCase(getProjectCategory.fulfilled, (state, actions) => {
        state.projectCategories = actions.payload;
      })
      .addCase(createProjectAuthorize.fulfilled, (state, actions)=>{
        state.newProject = actions.payload
      })
      .addCase(getProjectDetail.fulfilled,(state, actions)=>{
        state.projectDetail = actions.payload
      })
      .addCase(deleteProject.pending, (state, actions)=>{
        state.isDeleting = false
      })
      .addCase(deleteProject.fulfilled, (state, actions)=>{
        state.isDeleting = true
      })
      .addCase(deleteProject.rejected,(state, actions)=>{
        state.isDeleting = true
      })
      .addCase(updateProject.pending,(state,actions)=>{
        state.isDeleting = false
      })
      .addCase(updateProject.fulfilled, (state, actions)=>{
        state.isDeleting = true
      })
      .addCase(updateProject.rejected,(state, actions)=>{
        state.isDeleting = true
      })
  },
});
