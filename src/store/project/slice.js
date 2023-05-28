import { createSlice } from "@reduxjs/toolkit";
import {
  asignUserProject,
  createProjectAuthorize,
  deleteProject,
  getProjectCategory,
  getProjectDetail,
  getProjectList,
  removeUserFromProject,
  updateProject,
} from "./thunkAction";

const initialState = {
  projectList: [],
  projectCategories: [],
  newProject: null,
  projectDetail: null,
  isDeleting: true,
  projectId: null,
  projectCategoryId: null,
};
export const {
  reducer: projectServiceReducer,
  actions: projectServiceActions,
} = createSlice({
  name: "ProjectService",
  initialState,
  reducers: {
    getProjectId: (state, actions) => {
      state.projectId = actions.payload;
    },
    getProjectCategoryId: (state, actions) => {
      state.projectCategoryId = actions.payload;
    },
  },
  extraReducers: (buidler) => {
    buidler
      .addCase(getProjectList.fulfilled, (state, actions) => {
        state.projectList = actions.payload.slice(50);
      })
      .addCase(getProjectCategory.fulfilled, (state, actions) => {
        state.projectCategories = actions.payload;
      })
      .addCase(createProjectAuthorize.fulfilled, (state, actions) => {
        state.newProject = actions.payload;
      })
      .addCase(getProjectDetail.fulfilled, (state, actions) => {
        state.projectDetail = actions.payload;
      })
      .addCase(deleteProject.pending, (state, actions) => {
        state.isDeleting = false;
      })
      .addCase(deleteProject.fulfilled, (state, actions) => {
        state.isDeleting = true;
      })
      .addCase(deleteProject.rejected, (state, actions) => {
        state.isDeleting = true;
      })
      .addCase(updateProject.pending, (state, actions) => {
        state.isDeleting = false;
      })
      .addCase(updateProject.fulfilled, (state, actions) => {
        state.isDeleting = true;
      })
      .addCase(updateProject.rejected, (state, actions) => {
        state.isDeleting = true;
      })
      .addCase(asignUserProject.pending, (state, actions) => {
        state.isDeleting = false;
      })
      .addCase(asignUserProject.fulfilled, (state, actions) => {
        state.isDeleting = true;
      })
      .addCase(asignUserProject.rejected, (state, actions) => {
        state.isDeleting = true;
      })
      .addCase(removeUserFromProject.pending, (state, actions) => {
        state.isDeleting = false;
      })
      .addCase(removeUserFromProject.fulfilled, (state, actions) => {
        state.isDeleting = true;
      })
      .addCase(removeUserFromProject.rejected, (state, actions) => {
        state.isDeleting = true;
      });
  },
});
