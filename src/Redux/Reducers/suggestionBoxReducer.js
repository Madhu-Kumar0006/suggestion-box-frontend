/* eslint-disable import/no-anonymous-default-export */
import {
    GET_QUESTION_SUCCESS,
    GET_QUESTION_ERROR
    } from "../Actions/Types";
    
    const initialState = {
      response: '',
      error: ''
    };
    
    export default function (state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
          case GET_QUESTION_SUCCESS:
          return {
            ...state,
            response: payload,
          };
          case GET_QUESTION_ERROR:
          return {
            ...state,
            error: payload,
          };
        default:
          return state;
      }
  
  }