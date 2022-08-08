import api from "../Api/Api";
import { ADD_QUESTION_SUCCESS, ADD_QUESTION_ERROR, ADD_QUESTION_START } from "./Types";
import {alertActions} from './alertAction';

export const addQuestion = (body) => async dispatch => {
    dispatch({
      type:ADD_QUESTION_START
    })
    try {
      const res = await api.post('/suggestions/addQuestion', body);
      // console.log(res);
      if (res) {
        dispatch({
            type:ADD_QUESTION_SUCCESS,
            payload:res.data && res.data
        })
      }
      // console.log('res', res.data.msg);
      dispatch(alertActions.success(res.data.msg));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }catch (err) {
      // console.log('catch', err);
        dispatch({
          type: ADD_QUESTION_ERROR,
          payload: err.response && err.response,
        });
        console.log(err.errors.msg);
        dispatch(alertActions.error(err.response.data));
        setTimeout(() => {
          dispatch(alertActions.error_clear());
          dispatch(alertActions.clear());
        }, 3000);
      }
}