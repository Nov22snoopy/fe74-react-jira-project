import http from "../constant/api";

export const UserService = {
  register: (payload) => http.post("Users/signup", payload),
  login :(payload)=> http.post("Users/signin", payload),
  getUser: (query)=> http.get(`Users/getUser?keyword=${query}`),
  getAllUser: ()=>http.get(`Users/getUser`),
  editUser: (payload) => http.put(`Users/editUser`,payload)
}