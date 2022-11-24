import { combineReducers } from "redux";
import auth from "./loginReducer";
import { alert } from "./alertReducer";
import suggestionBoxReducer from './suggestionBoxReducer';
import user from "./userReducer";
import suggestionsReducer from "./suggestionsReducer";
import getQuestionDetailsReducer from "./getQuestionDetailsReducer";
import teamMemberReducer from "./teamMemberReducer"
import mySubscriptionReducer from "./mySubscriptionReducer";

export default combineReducers({
  auth,
  alert,
  user,
  suggestionsReducer,
  getQuestionDetailsReducer,
  suggestionBoxReducer,
  teamMemberReducer,
  mySubscriptionReducer
})
