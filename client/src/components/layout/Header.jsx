import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Header extends Component {
  onLogoutClick = event => {
    event.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <Link className="header__link" to="/feed">
          Discussion
        </Link>
        <Link className="header__link" to="/dashboard">
          Dashboard
        </Link>
        <div className="header__user" onClick={this.onLogoutClick}>
          <img
            src={user.avatar}
            alt={user.name}
            title="You must have a Gravatar connected to your email to display an image"
          />
          Logout
        </div>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Link className="header__link header__link--signup" to="/register">
          Sign Up
        </Link>
        <Link className="header__link" to="/login">
          Login
        </Link>
      </Fragment>
    );

    return (
      <header className="header">
        <Link className="header__brand" to="/">
          Devlink
        </Link>
        <Link className="header__link" to="/profiles">
          Developers
        </Link>
        {isAuthenticated ? authLinks : guestLinks}
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Header);
