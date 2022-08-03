import api from "../Api/Api";
import { GET_QUESTION_START ,
        GET_QUESTION_SUCCESS, 
        GET_QUESTION_ERROR,
        UPDATE_STATUS_START,
        UPDATE_STATUS_SUCCESS,
        UPDATE_STATUS_ERROR
      } from "./Types";
import { alertActions } from "./alertAction";

// get all suggestion boxes
export const getQuestion = ( ) => async (dispatch) => {
  dispatch({
    type: GET_QUESTION_START,
  });
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


  // change suggestion boxes status
  export const updateSuggestionBoxStatus = (id, data) => async (dispatch) => {
    dispatch({
      type: UPDATE_STATUS_START,
    });
    try {
      const res = await api.put("/suggestions/updateStatus/"+id, data);
      if (res) {
        dispatch({
          type: UPDATE_STATUS_SUCCESS,
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
        type: UPDATE_STATUS_ERROR,
        payload: err.response && err.response,
      });
      dispatch(alertActions.error(err.response.data.msg));
      setTimeout(() => {
        dispatch(alertActions.error_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  };

