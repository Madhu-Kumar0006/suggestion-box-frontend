/* eslint-disable import/no-anonymous-default-export */
import { GET_QUESTION_START ,
          GET_QUESTION_SUCCESS, 
          GET_QUESTION_ERROR,
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
          case GET_QUESTION_START:
            return {
              ...state,
              loading: true
            };
          case GET_QUESTION_SUCCESS:
          return {
            ...state,
            response: payload,
            loading: false
          };
          case GET_QUESTION_ERROR:
          return {
            ...state,
            error: payload,
            loading: false
          };
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