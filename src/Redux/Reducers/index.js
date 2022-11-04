import { combineReducers } from "redux";
import auth from "./loginReducer";
import { alert } from "./alertReducer";
import suggestionBoxReducer from './suggestionBoxReducer';
import user from "./userReducer";
import suggestionsReducer from "./suggestionsReducer";
import updateStatusReducer from "./updateStatusReducer";
import getQuestionDetailsReducer from "./getQuestionDetailsReducer";
import addQuestionReducer from './addQuestionReducer';
import teamMemberReducer from "./teamMemberReducer"

export default combineReducers({
  auth,
  alert,
  user,
  suggestionsReducer,
  updateStatusReducer,
  getQuestionDetailsReducer,
  suggestionBoxReducer,
  addQuestionReducer,
  teamMemberReducer
})
