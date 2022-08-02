import { combineReducers } from "redux";
import auth from "./loginReducer";
import { alert } from "./alertReducer";
import user from "./userReducer";
import suggestionBoxReducer from './suggestionBoxReducer';

export default combineReducers({
  auth,
  alert,
  user,
  suggestionBoxReducer
  });