import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addExperience } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import CheckboxField from "../common/CheckboxField";

class AddExperience extends Component {
  state = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
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

  onCheck = event => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = event => {
    event.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <form className="add-experience__form" onSubmit={this.onSubmit}>
          <Link to="/dashboard" className="add-experience__goback">
            Go Back
          </Link>
          <h1 className="add-experience__title">Add Experience</h1>
          <p className="add-experience__subtitle">
            Let's fill out some information about your current/past experience.
          </p>
          <p className="add-experience__subtitle">* = required fields</p>
          <TextFieldGroup
            label="* Company"
            placeholder="(e.g., Google)"
            name="company"
            value={this.state.company}
            onChange={this.onChange}
            error={errors.company}
          />
          <TextFieldGroup
            label="* Job title"
            placeholder="(e.g., Web Developer)"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
          />
          <TextFieldGroup
            label="Location"
            placeholder="(e.g., Toronto, Canada)"
            name="location"
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
          />
          <TextFieldGroup
            label="From"
            name="from"
            type="date"
            value={this.state.from}
            onChange={this.onChange}
            error={errors.from}
          />
          <TextFieldGroup
            label="To"
            name="to"
            type="date"
            value={this.state.to}
            onChange={this.onChange}
            error={errors.to}
            disabled={this.state.disabled ? "disabled" : ""}
          />
          <CheckboxField
            label="Current Job"
            name="current"
            value={this.state.current}
            checked={this.state.current}
            onChange={this.onCheck}
            id="current"
          />
          <TextAreaFieldGroup
            label="Job Description"
            placeholder="Say something about this experience."
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
          />
          <input
            type="submit"
            value="Submit"
            className="add-experience__submit"
          />
        </form>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(AddExperience);
