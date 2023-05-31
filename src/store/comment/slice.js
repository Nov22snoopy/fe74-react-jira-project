import { createSlice } from "@reduxjs/toolkit";
import { deleteComment, editComment, getAllComment, insertComment } from "./thunkAction";
const initialState = {
  allComment: [],
  newComment:null,
  isLoading: true
}
export const {reducer: commentServiceReducer, actions: commentServiceActions} = createSlice({
  name: 'CommentService',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getAllComment.fulfilled,(state,actions)=>{
      state.allComment = actions.payload
    })
    .addCase(insertComment.fulfilled, (state, acions)=>{
      state.newComment = acions.payload
    })
    .addCase(deleteComment.pending,(state,actions)=>{
      state.isLoading = false
    })
    .addCase(deleteComment.fulfilled,(state,actions)=>{
      state.isLoading = true
    })
    .addCase(editComment.pending,(state,actions)=>{
      state.isLoading = false
    })
    .addCase(editComment.fulfilled,(state,actions)=>{
      state.isLoading = true
    })
  }
})