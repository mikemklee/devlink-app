import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class ProfileItem extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    const { profile } = this.props;
    return (
      <div className="profiles__item">
        <div className="profiles__item__avatar">
          <img src={profile.user.avatar} alt="avatar" />
        </div>
        <div className="profiles__item__user">
          <div className="profiles__item__user--link">
            <Link to={`/profile/${profile.handle}`}>{profile.user.name} </Link>
          </div>
          <div className="profiles__item__user--occupation">
            {profile.status}{" "}
            {isEmpty(profile.company) ? null : (
              <span>at {profile.company}</span>
            )}
          </div>
          <div className="profiles__item__user--location">
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </div>
        </div>
        <div className="profiles__item__skills">
          <span className="profiles__item__skills--label">Top Skills:</span>
          {profile.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="profiles__item__skills--item">
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default ProfileItem;
