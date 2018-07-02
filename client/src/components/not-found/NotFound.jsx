import React from "react";

const NotFound = ({ history }) => {
  return (
    <div className="not-found">
      <img className="not-found__image" src="/img/404.png" alt="notfound" />
      <h1 className="not-found__title">Page Not Found</h1>
      <p className="not-found__subtitle">Sorry, this page does not exist.</p>
      <button onClick={() => history.push("/")} className="not-found__goback">
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
