import api from "../Api/Api";
import { 
    GET_PACKAGES_START,
    GET_PACKAGES_SUCCESS,
    GET_PACKAGES_ERROR
      } from "./Types";
import { alertActions } from "./alertAction";

//get all suggestion boxes
export const getPackages = () => async (dispatch) => {
  dispatch({
    type: GET_PACKAGES_START,
  });
  try {
    const res = await api.get("/package/getPackages");
    if (res) {
      dispatch({
        type: GET_PACKAGES_SUCCESS,
        payload: res.data && res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_PACKAGES_ERROR,
      payload: err.response && err.response,
    });
    dispatch(alertActions.error(err.response.data.msg));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

