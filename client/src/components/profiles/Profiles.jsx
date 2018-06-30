import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfiles } from "../../actions/profileActions";

import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  static propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles to display.</h4>;
      }
    }
    return (
      <div className="profiles">
        <h1 className="profiles__title">Developer Profiles</h1>
        <p className="profiles__subtitle">Browse and connect with developers</p>
        {profileItems}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
