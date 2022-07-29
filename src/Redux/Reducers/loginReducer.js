/* eslint-disable import/no-anonymous-default-export */
import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from "../Actions/Types";
  import jwtDecode from "jwt-decode";
  
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") ? true : false,
    role_id: localStorage.getItem("role_id"),
    loading: false,
    user_name: null,
    loginFailMessage: "",
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case LOGIN_START:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_SUCCESS:
        const decodedToken = jwtDecode(payload);
        console.log(decodedToken);
        const role_id = decodedToken.user.role_id;
        const id = decodedToken.user.id;
        const userName = decodedToken.user.first_name + " " + decodedToken.user.last_name;
        localStorage.setItem("role_id", role_id);
        localStorage.setItem("isActivated", true);
        localStorage.setItem("token", payload);
        localStorage.setItem("user_id",id);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          role_id: role_id,
          loading: false,
          token: payload,
          user_name: userName
        };
      case LOGIN_FAIL:
        return {
          ...state,
          ...payload,
          loginFailMessage: payload,
        };
      case LOGOUT:
        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        localStorage.removeItem("isActivated");
        localStorage.removeItem("user_id");
        return {
          ...state,
          ...payload,
          token: null,
          isAuthenticated: false,
          role_id: null,
          loading: false,
          user_name: null
        };
      default:
        return state;
    }
  }
  