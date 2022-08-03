import { combineReducers } from "redux";
import auth from "./loginReducer";
import { alert } from "./alertReducer";
import suggestionBoxReducer from './suggestionBoxReducer';
import user from "./userReducer";
import suggestionsReducers from "./suggestionsReducers";


export default combineReducers({
  auth,
  alert,
  user,
  suggestionBoxReducer,
  suggestionsReducers,
})
