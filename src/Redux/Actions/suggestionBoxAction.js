import api from "../Api/Api";
import { GET_ALL_QUESTION_START ,
        GET_ALL_QUESTION_SUCCESS, 
        GET_ALL_QUESTION_ERROR,
      } from "./Types";
import { alertActions } from "./alertAction";

// get all suggestion boxes
export const getAllQuestion = ( ) => async (dispatch) => {
  dispatch({
    type: GET_ALL_QUESTION_START,
  });
  try {
    const res = await api.get("/suggestions/getAllQuestion");
    if (res) {
      dispatch({
        type: GET_ALL_QUESTION_SUCCESS,
        payload: res.data && res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ALL_QUESTION_ERROR,
      payload: err.response && err.response,
    });
    dispatch(alertActions.error(err.response.data.msg));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
