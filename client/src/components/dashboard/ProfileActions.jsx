import React from "react";
import { Link } from "react-router-dom";

import Icon from "../common/Icon";

const ProfileActions = () => {
  return (
    <div className="dashboard__actions">
      <Link to="/edit-profile" className="dashboard__actions__item">
        <Icon name="user" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="dashboard__actions__item">
        <Icon name="linkedin" />
        Add Experience
      </Link>
      <Link to="/add-education" className="dashboard__actions__item">
        <Icon name="feather" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
