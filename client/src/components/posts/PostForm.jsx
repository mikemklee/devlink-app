import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../../actions/postActions";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class PostForm extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  state = {
    text: "",
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
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({
      text: ""
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <form className="post__form" onSubmit={this.onSubmit}>
        <div className="post__form__title">Discussions</div>
        <TextAreaFieldGroup
          placeholder="Got a question? Need an advice? Ask your fellow developers for tips and help!"
          name="text"
          value={this.state.text}
          onChange={this.onChange}
          error={errors.text}
        />
        <button type="submit" className="post__form__submit">
          Submit
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
