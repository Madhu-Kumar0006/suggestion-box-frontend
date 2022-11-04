/* eslint-disable import/no-anonymous-default-export */
import { GET_ALL_QUESTION_START ,
          GET_ALL_QUESTION_SUCCESS, 
          GET_ALL_QUESTION_ERROR,
          ADD_QUESTION_START,
          ADD_QUESTION_SUCCESS,
          ADD_QUESTION_ERROR,
          UPDATE_STATUS_START,
          UPDATE_STATUS_SUCCESS,
          UPDATE_STATUS_ERROR
        } from "./../Actions/Types";
    
    const initialState = {
      response: '',
      error: '',
      getAllQuestionLoading: false,
      addQuestionLoading: false,
      updateStatusLoading: false
    };
    
    export default function (state = initialState, action) {
      const { type, payload } = action;
      switch (type) {
          case GET_ALL_QUESTION_START:
            return {
              ...state,
              getAllQuestionLoading: true
            };
          case GET_ALL_QUESTION_SUCCESS:
          return {
            ...state,
            response: payload,
            getAllQuestionLoading: false
          };
          case GET_ALL_QUESTION_ERROR:
          return {
            ...state,
            error: payload,
            getAllQuestionLoading: false
          };
          case ADD_QUESTION_START:
          return {
            ...state,
            addQuestionLoading:true
          }
          case ADD_QUESTION_SUCCESS:
          return {
             ...state,
             addQuestionLoading:false,
             response:payload
          }
          case ADD_QUESTION_ERROR:
          return {
              ...state,
              addQuestionLoading:false,
              error:payload
          }
          case UPDATE_STATUS_START:
          return {
              ...state,
              updateStatusLoading: true
          };
          case UPDATE_STATUS_SUCCESS:
          return {
            ...state,
            response: payload,
            updateStatusLoading: false
          };
          case UPDATE_STATUS_ERROR:
          return {
            ...state,
            error: payload,
            updateStatusLoading: false
          };
        default:
          return state;
      }
  
  }