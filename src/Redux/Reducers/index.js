import { combineReducers } from "redux";
import auth from "./loginReducer";
import { alert } from "./alertReducer";
import suggestionBoxReducer from './suggestionBoxReducer';
import user from "./userReducer";
import suggestionsReducer from "./suggestionsReducer";
import updateStatusReducer from "./updateStatusReducer";
import getQuestionDetailsReducer from "./getQuestionDetailsReducer";


export default combineReducers({
  auth,
  alert,
  suggestionBoxReducer,
  user,
  suggestionsReducer,
  updateStatusReducer,
  getQuestionDetailsReducer
})