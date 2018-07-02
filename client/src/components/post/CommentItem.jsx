import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";

import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick = (postId, commentId) => () => {
    this.props.deleteComment(postId, commentId);
  };

  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="comment__item">
        <Link to={`/profile/${comment.user}`} className="comment__item__avatar">
          <img src={comment.avatar} alt="avatar" />
        </Link>

        <div className="comment__item__detail">
          <p className="comment__item__detail--name">{comment.name}</p>
          <p className="comment__item__detail--date">
            {moment(comment.date).fromNow()}
          </p>
          <p className="comment__item__detail--text">{comment.text}</p>
        </div>

        {comment.user === auth.user.id && (
          <div className="comment__item__actions">
            <button
              onClick={this.onDeleteClick(postId, comment._id)}
              className="comment__item__actions--delete"
            >
              <span>&times;</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
