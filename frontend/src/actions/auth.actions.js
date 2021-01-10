import axios from "../Axios/axios";
import { authActionTypes } from "./action-types";

export const login = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authActionTypes.LOGIN_REQUEST,
    });

    const res = await axios.post("/admin/signIn", { ...user });
    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      const { error, message } = res.data;
      if (res.status === 400) {
        dispatch({
          type: authActionTypes.LOGIN_FAILURE,
          payload: {
            error: error,
            message: message,
          },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // dispatch({
    //   type: authActionTypes.LOGIN_REQUEST,
    // });
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      // dispatch({
      //   type: authActionTypes.LOGIN_FAILURE,
      //   payload: {
      //     error: "Failed to login.",
      //     message: "Failed to login.",
      //   },
      // });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: authActionTypes.LOGOUT_REQUEST,
    });
    const res = await axios.post("/admin/signOut");
    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authActionTypes.LOGOUT_SUCCESS,
      });
    } else {
      const { error, message } = res.data;
      dispatch({
        type: authActionTypes.LOGOUT_FAILURE,
        error: error,
        message: message,
      });
    }
  };
};

export const register = (user) => {
  return async (dispatch) => {
    dispatch({
      type: authActionTypes.REGISTER_REQUEST,
    });

    const res = await axios.post("/admin/signUp", { ...user });

    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: authActionTypes.REGISTER_SUCCESS,
        payload: {
          message: message,
        },
      });
    } else {
      if (res.status === 400) {
        const { message, error } = res.data;
        dispatch({
          type: authActionTypes.REGISTER_FAILURE,
          payload: {
            error: error,
            message: message,
          },
        });
      }
    }
  };
};
