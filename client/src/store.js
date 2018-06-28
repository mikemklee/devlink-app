import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// Reducer
import rootReducer from "./reducers";

// Initial State
const initialState = {};

// Middlewares
const middlewares = [thunk];

// The store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
