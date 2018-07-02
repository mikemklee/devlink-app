import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addComment } from "../../actions/postActions";

import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CommentForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <form className="comment__form" onSubmit={this.onSubmit}>
        <div className="comment__form__title">Comments</div>
        <TextAreaFieldGroup
          placeholder="Reply to post"
          name="text"
          value={this.state.text}
          onChange={this.onChange}
          error={errors.text}
        />
        <button type="submit" className="comment__form__submit">
          Submit
        </button>
      </form>
    );
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
