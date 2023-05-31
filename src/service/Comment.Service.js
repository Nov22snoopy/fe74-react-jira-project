import http from "../constant/api";

export const CommentService = {
  getAllComment: (query) => http.get(`Comment/getAll?taskId=${query}`),
  insertComment: (payload) => http.post(`Comment/insertComment`, payload),
  deleteComment: (query) => http.delete(`Comment/deleteComment?idComment=${query}`),
  editComment: (query,payload)=> http.put(`Comment/updateComment?id=${query}&contentComment=${payload}`)
}