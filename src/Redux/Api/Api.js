import Axios from "axios";
import store from "../Store/Store";
import { LOGOUT } from "../Actions/Types";
import { API_baseAppURL } from "./RequestPath.js";

//to set up base url
const api = Axios.create({
 baseURL: API_baseAppURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401 ) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;