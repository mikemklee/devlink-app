import { combineReducers } from "redux";
import authReducer from "./authReducer";

// Root reducer
export default combineReducers({
  auth: authReducer
});
