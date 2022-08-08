import api from "../Api/Api";
import { USER_GET_QUESTION_START, USER_GET_QUESTION_SUCCESS, USER_GET_QUESTION_ERROR,
        USER_POST_RESPONSE_START, USER_POST_RESPONSE_SUCCESS, USER_POST_RESPONSE_ERROR } from "./Types";

// get user questions
export const getQuestionWithToken = (data) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GET_QUESTION_START,
    });
    const res = await api.get("/suggestions/getQuestionWithToken/" + data);
    if (res) {
      dispatch({
        type: USER_GET_QUESTION_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_GET_QUESTION_ERROR,
      payload: err.response && err.response,
    });
  }
};

//submit response
export const submitResponse = (id, data) => async (dispatch) => {

    const response = {
        'response' : data
    }
    
  try {
    dispatch({
      type: USER_POST_RESPONSE_START,
    });
    const res = await api.post("/response/addSuggestionResponse/" + id, response);
    if (res) {
      dispatch({
        type: USER_POST_RESPONSE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_POST_RESPONSE_ERROR,
      payload: err.response && err.response,
    });
  }
};
