import api from "../Api/Api";
import { GET_QUESTION_START,
        GET_QUESTION_SUCCESS,
        GET_QUESTION_ERROR
      } from "./Types";


// change suggestion boxes status
export const getQuestion = (id) => async (dispatch) => {
  dispatch({
    type: GET_QUESTION_START,
  });
  try {
    const res = await api.get("/suggestions/getQuestion/"+id);
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
  }
};

