import api from "../Api/Api";
import { ADD_TEAM_MEMBER_SUCCESS, ADD_TEAM_MEMBER_ERROR, ADD_TEAM_MEMBER_START,
        GET_TEAM_MEMBERS_SUCCESS, GET_TEAM_MEMBERS_START, GET_TEAM_MEMBERS_ERROR } from "./Types";
import {alertActions} from './alertAction';

export const addTeamMember = (body) => async dispatch => {
    dispatch({
      type:ADD_TEAM_MEMBER_START
    })
    try {
      const res = await api.post('/user/addTeamMember', body);
      // console.log(res);
      if (res) {
        dispatch({
            type:ADD_TEAM_MEMBER_SUCCESS,
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
          type: ADD_TEAM_MEMBER_ERROR,
          payload: err.response && err.response,
        });
        dispatch(alertActions.error(err.response.data.msg));
        setTimeout(() => {
          dispatch(alertActions.error_clear());
          dispatch(alertActions.clear());
        }, 3000);
      }
}


export const getTeamMembers = () => async dispatch => {
    let business_id = localStorage.getItem("business_id")
    dispatch({
      type:GET_TEAM_MEMBERS_START
    })
    try {
      const res = await api.get('/user/getTeamMember/'+business_id);
      if (res) {
        dispatch({
            type:GET_TEAM_MEMBERS_SUCCESS,
            payload:res.data && res.data
        })
      }
    // console.log('res', res.data.msg);
    //   dispatch(alertActions.success(res.data.msg));
    //   setTimeout(() => {
    //     dispatch(alertActions.success_clear());
    //     dispatch(alertActions.clear());
    //   }, 3000);
    }catch (err) {
      // console.log('catch', err);
        dispatch({
          type: GET_TEAM_MEMBERS_ERROR,
          payload: err.response && err.response,
        });
        dispatch(alertActions.error(err.response.data.msg));
        setTimeout(() => {
          dispatch(alertActions.error_clear());
          dispatch(alertActions.clear());
        }, 3000);
      }
}