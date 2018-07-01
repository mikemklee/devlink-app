import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextIconField from "../common/TextIconField";
import SelectListGroup from "../common/SelectListGroup";

import isEmpty from "../../validation/isEmpty";

class EditProfile extends Component {
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

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesn't exist, make empty string
      Object.keys(profile).forEach((key, index) => {
        if (
          ["company", "website", "location", "githubusername", "bio"].includes(
            key
          )
        ) {
          profile[key] = !isEmpty(profile[key]) ? profile[key] : "";
        }
      });

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.social.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.social.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.social.twitter,
        linkedin: profile.social.linkedin
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
    console.log(profileData);
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
      <div className="edit-profile">
        <form className="edit-profile__form" nSubmit={this.onSubmit}>
          <Link to="/dashboard" className="edit-profile__goback">
            Go Back
          </Link>
          <h1 className="edit-profile__title">Edit Profile</h1>
          <small className="edit-profile__subtitle">* = required fields</small>
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
            className="edit-profile__togglesocial"
          >
            Add Social Networks
            <span>(Optional)</span>
          </button>
          {socialInputs}
          <input
            type="submit"
            value="Submit"
            className="edit-profile__submit"
          />
        </form>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(EditProfile);
