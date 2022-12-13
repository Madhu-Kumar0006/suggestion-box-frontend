import api from "../Api/Api";
import { SET_PASSWORD_START, SET_PASSWORD_SUCCESS, SET_PASSWORD_ERROR } from "./Types";
import { alertActions } from "./alertAction";

// set password
export const setPassword = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_PASSWORD_START,
    });
    const res = await api.post("/user/setPassword", data);
    if (res) {
      dispatch({
        type: SET_PASSWORD_SUCCESS,
        payload: res.data && res.data,
      });
      dispatch(alertActions.success(res.data.msg));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: SET_PASSWORD_ERROR,
      payload: err.response && err.response,
    });
    dispatch(alertActions.error(err.response.data.msg));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};