/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_RESPONSES_SUCCESS, GET_ALL_RESPONSES_ERROR } from "../Actions/Types";
    
    const initialState = {
      response: '',
      error: ''
    };
    
    export default function (state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
          case GET_ALL_RESPONSES_SUCCESS:
          return {
            ...state,
            response: payload,
          };
          case GET_ALL_RESPONSES_ERROR:
          return {
            ...state,
            error: payload,
          };
        default:
          return state;
      }
  
  }