import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addEducation } from "../../actions/profileActions";

import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import CheckboxField from "../common/CheckboxField";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
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

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <form className="add-education__form" onSubmit={this.onSubmit}>
          <Link to="/dashboard" className="add-education__goback">
            Go Back
          </Link>
          <h1 className="add-education__title">Add Education</h1>
          <p className="add-education__subtitle">
            Add any school, bootcamp, etc that you have attended
          </p>
          <p className="add-education__subtitle">* = required fields</p>
          <TextFieldGroup
            placeholder="* School"
            name="school"
            value={this.state.school}
            onChange={this.onChange}
            error={errors.school}
          />
          <TextFieldGroup
            placeholder="* Degree or Certification"
            name="degree"
            value={this.state.degree}
            onChange={this.onChange}
            error={errors.degree}
          />
          <TextFieldGroup
            placeholder="* Field of Study"
            name="fieldofstudy"
            value={this.state.fieldofstudy}
            onChange={this.onChange}
            error={errors.fieldofstudy}
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
            label="Currently Enrolled"
            name="current"
            value={this.state.current}
            checked={this.state.current}
            onChange={this.onCheck}
            id="current"
          />
          <TextAreaFieldGroup
            placeholder="Program Description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
            info="Tell us about the program"
          />
          <input
            type="submit"
            value="Submit"
            className="add-education__submit"
          />
        </form>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(AddEducation);
