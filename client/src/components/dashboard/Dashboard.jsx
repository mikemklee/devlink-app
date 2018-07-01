import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";

import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import checkTokenExpiry from "../../utils/checkTokenExpiry";

class Dashboard extends Component {
  componentDidMount() {
    checkTokenExpiry();
    this.props.getCurrentProfile();
  }

  onDeleteClick = event => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <Fragment>
            <p className="dashboard__greeting">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            {/* TODO: add separate button for 'view profile'  */}
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <button
              onClick={this.onDeleteClick}
              className="dashboard__button dashboard__button--delete"
            >
              Delete Account
            </button>
          </Fragment>
        );
      } else {
        // User logged in but has no profile
        dashboardContent = (
          <Fragment>
            <p className="dashboard__greeting">Welcome {user.name}</p>
            <p className="dashboard__calltoaction">
              You have not set up your profile yet. <br />
              Please take a moment and complete your profile!
            </p>
            <Link to="/create-profile" className="dashboard__button">
              Go!
            </Link>
          </Fragment>
        );
      }
    }

    return (
      <div className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
