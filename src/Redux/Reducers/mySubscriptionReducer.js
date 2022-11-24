/* eslint-disable import/no-anonymous-default-export */
import {
    GET_PACKAGES_START,
    GET_PACKAGES_SUCCESS,
    GET_PACKAGES_ERROR
  } from "./../Actions/Types";

const initialState = {
response: '',
error: '',
getPackagesLoading: false,
};

export default function (state = initialState, action) {
const { type, payload } = action;
switch (type) {
    case GET_PACKAGES_START:
      return {
        ...state,
        getPackagesLoading: true
      };
    case GET_PACKAGES_SUCCESS:
    return {
      ...state,
      response: payload,
      getPackagesLoading: false
    };
    case GET_PACKAGES_ERROR:
    return {
      ...state,
      error: payload,
      getPackagesLoading: false
    }; 
  default:
    return state;
}
}