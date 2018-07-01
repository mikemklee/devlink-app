import jwt_decode from "jwt-decode";

import store from "../store";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "../actions/authActions";
import { clearCurrentProfile } from "../actions/profileActions";

const checkTokenExpiry = () => {
  // Check for token
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.log("expired!");
      // Logout User
      store.dispatch(logoutUser());
      // Clear current profile
      store.dispatch(clearCurrentProfile());
      // Redirect to login
      window.location.href = "/login";
    }
  }
};

export default checkTokenExpiry;
