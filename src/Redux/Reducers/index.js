import { combineReducers } from "redux";
import auth from "./loginReducer";
import { alert } from "./alertReducer";
import suggestionBoxReducer from './suggestionBoxReducer';

export default combineReducers({
  auth,
  alert,
  suggestionBoxReducer
  });