import http from "../constant/api";

export const UserService = {
  register: (payload) => http.post("Users/signup", payload),
  login :(payload)=> http.post("Users/signin", payload)
}