import api from "../Api/Api";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./Types";
import { alertActions } from "./alertAction";

// admin login
export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_START,
    });
    const res = await api.post("/user/login", data);
    if (res) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token && res.data.token,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response && err.response,
    });
    dispatch(alertActions.error(err.response.data.msg));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

//logout user
export const logout = (dispatch) => {
    dispatch({ type: LOGOUT });
}
