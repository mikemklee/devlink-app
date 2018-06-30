import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <img src="./img/opensource.png" alt="logo" />
        <h1 className="landing__title">Devlink</h1>
        <p className="landing__subtitle">Where developers come together.</p>
        <div className="landing__links">
          <Link to="/register" className="landing__link landing__link--signup">
            Sign Up
          </Link>
          <Link to="/login" className="landing__link landing__link--login">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
