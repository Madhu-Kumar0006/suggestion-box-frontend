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
  business_id: localStorage.getItem("business_id"),
  end_date: localStorage.getItem("end_date"),
  loading: false,
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
      const role_id = decodedToken.user.role_id;
      const id = decodedToken.user.id;
      const business_id = decodedToken.user.business_id;
      const end_date = decodedToken.user.end_date;
      localStorage.setItem("role_id", role_id);
      localStorage.setItem("isActivated", true);
      localStorage.setItem("token", payload);
      localStorage.setItem("user_id", id);
      localStorage.setItem("business_id", business_id);
      localStorage.setItem("end_date", end_date);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        role_id: role_id,
        business_id: business_id,
        loading: false,
        token: payload,
        end_date: end_date,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        ...payload,
        loading: false,
        loginFailMessage: payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("role_id");
      localStorage.removeItem("isActivated");
      localStorage.removeItem("user_id");
      localStorage.removeItem("business_id");
      localStorage.removeItem("end_date");
      return {
        ...state,
        ...payload,
        token: null,
        isAuthenticated: false,
        business_id: null,
        role_id: null,
        loading: false,
        end_date: null,
      };
    default:
      return state;
  }
}
