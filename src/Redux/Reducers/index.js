import { combineReducers } from "redux";
import auth from "./loginReducer";
import { alert } from "./alertReducer";

export default combineReducers({
  auth,
  alert
  });