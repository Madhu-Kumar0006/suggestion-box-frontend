import api from "../Api/Api";
import { GET_ALL_RESPONSES_SUCCESS, GET_ALL_RESPONSES_ERROR } from "./Types";
import { alertActions } from "./alertAction";

// admin login
export const getAllResponse = (questionId) => async (dispatch) => {

  try {
    const res = await api.get("/suggestions/getAllResponse/"+questionId);
    if (res) {
      dispatch({
        type: GET_ALL_RESPONSES_SUCCESS,
        payload: res.data && res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ALL_RESPONSES_ERROR,
      payload: err.response && err.response,
    });
    dispatch(alertActions.error(err.response.data.msg));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

