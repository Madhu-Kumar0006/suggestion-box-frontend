/* eslint-disable import/no-anonymous-default-export */
import { 
    UPDATE_STATUS_START,
    UPDATE_STATUS_SUCCESS,
    UPDATE_STATUS_ERROR
  } from "./../Actions/Types";

const initialState = {
response: '',
error: '',
loading: false
};

export default function (state = initialState, action) {
const { type, payload } = action;
switch (type) {
    case UPDATE_STATUS_START:
      return {
        ...state,
        loading: true
      };
    case UPDATE_STATUS_SUCCESS:
    return {
      ...state,
      response: payload,
      loading: false
    };
    case UPDATE_STATUS_ERROR:
    return {
      ...state,
      error: payload,
      loading: false
    };
  default:
    return state;
}
}