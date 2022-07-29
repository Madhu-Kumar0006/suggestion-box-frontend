import api from "../Api/Api";
import { GET_QUESTION_SUCCESS, GET_QUESTION_ERROR } from "./Types";
import { alertActions } from "./alertAction";

// admin login
export const getQuestion = ( ) => async (dispatch) => {

  try {
    const res = await api.get("/suggestions/getAllQuestion");
    if (res) {
      dispatch({
        type: GET_QUESTION_SUCCESS,
        payload: res.data && res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_QUESTION_ERROR,
      payload: err.response && err.response,
    });
    dispatch(alertActions.error(err.response.data.msg));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

