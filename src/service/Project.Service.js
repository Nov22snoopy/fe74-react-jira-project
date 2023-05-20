import http from "../constant/api";

export const ProjectService = {
  getProjectList: () => http.get(`Project/getAllProject`),
  getProjectCategory: () => http.get(`ProjectCategory`),
  creatProjectAuthorize: ( payload) => http.post(`Project/createProjectAuthorize`, payload),
  deleteProject:(query)=> http.delete(`Project/deleteProject?projectId=${query}`),
  getProjectDetail: (query)=> http.get (`Project/getProjectDetail?id=${query}`),
  updateProject: (query, payload)=> http.put(`Project/updateProject?projectId=${query}`,payload)
}