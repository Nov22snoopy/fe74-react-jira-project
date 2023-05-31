import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectService } from "../../service/Project.Service";
import { message } from "antd";
//get all project
export const getProjectList = createAsyncThunk(
  "ProjectService/getProjectList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ProjectService.getProjectList();
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//get project categories
export const getProjectCategory = createAsyncThunk(
  "ProjectService/getProjectCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await ProjectService.getProjectCategory();
      return res.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//Create a new project
export const createProjectAuthorize = createAsyncThunk (
  "ProjectService/createProjectAuthorize",
  async(payload, {rejectWithValue})=>{
    try {
      console.log(payload);
      const res = await ProjectService.creatProjectAuthorize(payload)
      if(res.data.statusCode === 200) {
        message.success('Create project successfully')
      }
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)      
    }
  }
);
//Delete Project
export const deleteProject = createAsyncThunk(
  "ProjectService/deleteProject",
  async(payload, {rejectWithValue}) =>{
    try {
      const res = await ProjectService.deleteProject(payload);
      if(res.data.statusCode === 200) {
        message.success('Delete project successfully')
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
//Get Project Detail
export const getProjectDetail = createAsyncThunk (
  "ProjectService/getProjectDetail",
  async (payload, {rejectWithValue}) =>{
    try {
      const res = await ProjectService.getProjectDetail(payload);
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
//Update Project
export const updateProject = createAsyncThunk(
  "ProjectService/updateProject",
  async(payload)=>{
    try {
      console.log(payload);
      const res = await ProjectService.updateProject(payload.id, payload)
      if(res.data.statusCode === 200) {
        message.success('Update project successfully')
      }
      return res.data.content
    } catch (error) {
      console.log(error);
    }
  }
);

// AsignUserProject
export const asignUserProject = createAsyncThunk(
  'ProjectService/asignUserProject',
  async(payload, {rejectWithValue})=>{
    try {
      const res = await ProjectService.asignUserProject(payload);
      if(res.data.statusCode === 200) {
        message.success(res.data.content)
      }
      return res.data.content
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

// Remove user from project
export const removeUserFromProject = createAsyncThunk(
  'ProjectService/removeUserFromProject',
  async(payload, {rejectWithValue})=>{
    try {
      const res = await ProjectService.removeUserFromProject(payload)
      if(res.data.statusCode === 200) {
        message.success(res.data.content)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
