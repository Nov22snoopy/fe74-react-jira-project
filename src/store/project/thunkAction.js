import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectService } from "../../service/Project.Service";

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
      const res = await ProjectService.creatProjectAuthorize(payload)
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
        console.log(res.data.statusCode);
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
  async(query,payload)=>{
    try {
      const res = await ProjectService.updateProject(query,payload)
      console.log(res.data.content);
      return res.data.content
    } catch (error) {
      console.log(error);
    }
  }
)
