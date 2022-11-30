
/* eslint-disable import/no-anonymous-default-export */
import { SET_PASSWORD_START,
        SET_PASSWORD_SUCCESS,
        SET_PASSWORD_ERROR
        } from "../Actions/Types";
        

const initialState = {
response: '',
error: '',
setPasswordLoading: false
};


export default function (state = initialState, action) {

const { type, payload } = action;
switch (type) {
    case SET_PASSWORD_START:
      return {
        ...state,
        setPasswordLoading: true
      };
    case SET_PASSWORD_SUCCESS:
    return {
      ...state,
      response: payload,
      setPasswordLoading: false
    };
    case SET_PASSWORD_ERROR:
    return {
      ...state,
      error: payload,
      setPasswordLoading: false
    };
  default:
    return state;
}
}