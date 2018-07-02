import React, { Component } from "react";
import PropTypes from "prop-types";

import Icon from "../common/Icon";
class ProfileHeader extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired
  };

  render() {
    const { profile } = this.props;
    console.log(profile);
    return (
      <div className="profile__header">
        <div className="profile__avatar">
          <img src={profile.user.avatar} alt="avatar" />
        </div>

        <div className="profile__user">
          <h1 className="profile__user--name">{profile.user.name}</h1>
          <p className="profile__user--occupation">
            {profile.status}{" "}
            {profile.company && <span>at {profile.company}</span>}
          </p>

          {profile.location && (
            <p className="profile__user--location">{profile.location}</p>
          )}
        </div>
        <div className="profile__links">
          {profile.githubusername && (
            <a
              className="profile__links__item"
              href={`https://github.com/${profile.githubusername}`}
              target="_blank"
              rel="noopener"
            >
              <Icon name="github" />
              Github
            </a>
          )}
          {profile.website && (
            <a
              className="profile__links__item"
              href={profile.website}
              target="_blank"
              rel="noopener"
            >
              <Icon name="globe" />
              Website
            </a>
          )}
          {profile.social &&
            profile.social.twitter && (
              <a
                className="profile__links__item"
                href={profile.social.twitter}
                target="_blank"
                rel="noopener"
              >
                <Icon name="twitter" />
                Twitter
              </a>
            )}
          {profile.social &&
            profile.social.linkedin && (
              <a
                className="profile__links__item"
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener"
              >
                <Icon name="linkedin" />
                Linkedin
              </a>
            )}
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
