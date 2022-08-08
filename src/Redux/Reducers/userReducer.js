import {
  USER_GET_QUESTION_START, USER_GET_QUESTION_SUCCESS, USER_GET_QUESTION_ERROR,
  USER_POST_RESPONSE_START, USER_POST_RESPONSE_SUCCESS, USER_POST_RESPONSE_ERROR
} from "../Actions/Types";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  response: "",
  error: "",
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_GET_QUESTION_START:
      return {
        ...state,
        loading: true,
      };
    case USER_GET_QUESTION_SUCCESS:
      return {
        ...state,
        response: payload,
        loading: false,
      };
      case USER_GET_QUESTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case USER_POST_RESPONSE_START:
      return {
        ...state,
        loading: true, 
      };
    case USER_POST_RESPONSE_SUCCESS:
      return {
        ...state,
        response: payload,
        loading: false,
      };
    case USER_POST_RESPONSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
