import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

// Root reducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
