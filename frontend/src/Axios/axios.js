import axios from "axios";
import { api } from "./urlConfig";
import store from "../store";
import { authActionTypes } from "../actions/action-types";

const token = window.localStorage.getItem("token");

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

//interceptors are nothing but middlewares
axiosIntance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth && auth.token) {
    //set the new or current token (token received after login) to header
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosIntance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const response = error.response;
    if (response) {
      const { status } = response;
      if (status === 500) {
        //token expired or something related to token
        //so let's logout
        localStorage.clear();
        store.dispatch({
          type: authActionTypes.LOGOUT_SUCCESS,
        });
      }
      return Promise.reject(error);
    }
  }
);
export default axiosIntance;
