import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import isEmpty from "../../validation/isEmpty";

import Icon from "../common/Icon";

class ProfileAbout extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    return (
      <Fragment>
        <div className="profile__about">
          <h3 className="profile__about--title">Hi there, I am {firstName}.</h3>
          <p className="profile__about--bio">
            {isEmpty(profile.bio) ? (
              <span>
                <em>{firstName} does not have a bio.</em>
              </span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>

          <div className="profile__skills">
            <div className="profile__skills--label">
              My Skills
              <Icon name="chevrons-right" />
            </div>
            {profile.skills.map((skill, index) => (
              <span key={index} className="profile__skills--item">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProfileAbout;
