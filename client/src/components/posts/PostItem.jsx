import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { deletePost, addLike, removeLike } from "../../actions/postActions";

import Icon from "../common/Icon";

class PostItem extends Component {
  onDeleteClick = id => () => {
    this.props.deletePost(id);
  };

  onLikeClick = id => () => {
    this.props.addLike(id);
  };

  onUnlikeClick = id => () => {
    this.props.removeLike(id);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="feed__item">
        <Link to={`/profile/${post.user}`} className="feed__item__avatar">
          <img src={post.avatar} alt="avatar" />
        </Link>
        <div className="feed__item__preview">
          <p className="feed__item__preview--name">{post.name}</p>
          <p className="feed__item__preview--date">
            {moment(post.date).fromNow()}
          </p>
          <p className="feed__item__preview--text">{post.text}</p>
        </div>
        {showActions && (
          <div className="feed__item__actions">
            <button
              onClick={this.onLikeClick(post._id)}
              className="feed__item__actions--like"
            >
              <Icon name="chevron-up" />
              {post.likes.length}
            </button>
            <button
              onClick={this.onUnlikeClick(post._id)}
              className="feed__item__actions--unlike"
            >
              <Icon name="chevron-down" />
            </button>
            <Link
              to={`/post/${post._id}`}
              className="feed__item__actions--comment"
            >
              Comment
            </Link>
            {post.user === auth.user.id && (
              <button
                onClick={this.onDeleteClick(post._id)}
                className="feed__item__actions--delete"
              >
                <span>&times;</span>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
