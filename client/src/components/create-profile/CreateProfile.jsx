import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { createProfile } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextIconField from "../common/TextIconField";
import SelectListGroup from "../common/SelectListGroup";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    linkedin: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin
    };
    this.props.createProfile(profileData, this.props.history);
  };

  toggleSocialInputs = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <Fragment>
          <TextIconField
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <TextIconField
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
        </Fragment>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Student", value: "Student" },
      { label: "Intern", value: "Intern" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <form className="create-profile__form" onSubmit={this.onSubmit}>
          <Link to="/dashboard" className="create-profile__goback">
            Go Back
          </Link>
          <h1 className="create-profile__title">Create Your Profile</h1>
          <p className="create-profile__subtitle">
            Let's fill out some information to make your profile stand out.
          </p>
          <p className="create-profile__subtitle">* = required fields</p>
          <TextFieldGroup
            placeholder="* Profile Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
            error={errors.handle}
            info="A unique handle for your profile URL. It could be your full name, company name, nickname, etc."
          />
          <SelectListGroup
            placeholder="Status"
            name="status"
            value={this.state.status}
            onChange={this.onChange}
            error={errors.status}
            options={options}
          />
          <TextFieldGroup
            placeholder="Company"
            name="company"
            value={this.state.company}
            onChange={this.onChange}
            error={errors.company}
          />
          <TextFieldGroup
            placeholder="Website - If you have a website, please provide its URL here"
            name="website"
            value={this.state.website}
            onChange={this.onChange}
            error={errors.website}
          />
          <TextFieldGroup
            placeholder="Location (e.g., Toronto, Canada)"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
          />
          <TextFieldGroup
            placeholder="Skills"
            name="skills"
            value={this.state.skills}
            onChange={this.onChange}
            error={errors.skills}
            info="Please provide a list of comma-separated values without spaces (e.g., HTML,CSS,Javascript,Python)"
          />
          <TextIconField
            placeholder="Github Username"
            name="githubusername"
            icon="github"
            value={this.state.githubusername}
            onChange={this.onChange}
            error={errors.githubusername}
          />
          <TextAreaFieldGroup
            placeholder="Say something about yourself!"
            name="bio"
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
          />
          <button
            type="button"
            onClick={this.toggleSocialInputs}
            className="create-profile__togglesocial"
          >
            Add Social Networks
            <span>(Optional)</span>
          </button>
          {socialInputs}
          <input
            type="submit"
            value="Submit"
            className="create-profile__submit"
          />
        </form>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfile);
