import { combineReducers } from "redux";
import auth from "./loginReducer";
import { alert } from "./alertReducer";
import suggestionBoxReducer from './suggestionBoxReducer';
import user from "./userReducer";
import suggestionsReducers from "./suggestionsReducers";
import addQuestionReducer from './addQuestionReducer';

export default combineReducers({
  auth,
  alert,
  user,
  suggestionBoxReducer,
  suggestionsReducers,
  addQuestionReducer,
})
