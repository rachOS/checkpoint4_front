import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

//Check token & load user
export const loadUser = (token) => (dispatch, getState) => {
  //USer loading
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      Authorization: `Basic ${token}`,
    },
  };

  axios
    .post("http://localhost:3000/api/auth/profile", null, config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      const isAuthenticated = false;
      dispatch({
        type: AUTH_ERROR,
        payload: isAuthenticated,
      });
    });
};
// Login User
export const login = (email, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify(email, password);
  console.log(body);
  axios
    .post("http://localhost:3000/api/auth/login", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

//Setup config/headers and token
export const tokenConfig = (getState) => {
  //Get token from localstorage
  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //If token, add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

//register user

export const register = (lastname, firstname, email, password, nickname) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // Request body
  const body = JSON.stringify(lastname, firstname, nickname, email, password);
  axios
    .post("http://localhost:3000/api/auth/register", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
