import {
  USER_GET_QUESTION,
  START,
  FAIL,
  USER_POST_RESPONSE,
} from "../Actions/Types";

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
  response: "",
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case START:
      return {
        ...state,
        loading: true,
      };
    case USER_GET_QUESTION:
      return {
        ...state,
        ...payload,
        response: payload,
      };
    case USER_POST_RESPONSE:
      return {
        ...state,
        ...payload,
        response: payload,
      };
    case FAIL:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
