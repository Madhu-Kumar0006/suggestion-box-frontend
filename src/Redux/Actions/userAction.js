import api from "../Api/Api";
import { USER_GET_QUESTION, START, FAIL, USER_POST_RESPONSE } from "./Types";

// get user questions
export const getQuestionWithToken = (data) => async (dispatch) => {
  try {
    dispatch({
      type: START,
    });
    const res = await api.get("/suggestions/getQuestionWithToken/" + data);
    if (res) {
      dispatch({
        type: USER_GET_QUESTION,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: FAIL,
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
      type: START,
    });
    const res = await api.post("/suggestions/addSuggestionResponse/" + id, response);
    if (res) {
      dispatch({
        type: USER_POST_RESPONSE,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: FAIL,
      payload: err.response && err.response,
    });
  }
};
