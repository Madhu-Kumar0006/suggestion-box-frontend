import api from "../Api/Api";
import { ADD_QUESTION_SUCCESS, ADD_QUESTION_ERROR, ADD_QUESTION_START } from "./Types";
import {alertActions} from './alertAction';

export const addQuestion = (body) => async dispatch => {
    dispatch({
      type:ADD_QUESTION_START
    })
    try {
      // console.log('coming');
      const res = await api.post('/suggestions/addQuestion', body);
      // console.log('passing');
      if (res) {
        // console.log('res recieved');
        dispatch({
            type:ADD_QUESTION_SUCCESS,
            payload:res.data && res.data
        })
      }
      dispatch(alertActions.success(res.data));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }catch (err) {
        dispatch({
          type: ADD_QUESTION_ERROR,
          payload: err.response && err.response,
        });
        console.log('catch')
        dispatch(alertActions.error(err.response.data));
        setTimeout(() => {
          dispatch(alertActions.error_clear());
          dispatch(alertActions.clear());
        }, 3000);
      }
}