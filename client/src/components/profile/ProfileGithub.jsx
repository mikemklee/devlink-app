import React, { Component } from "react";
import PropTypes from "prop-types";

import GithubRepo from "./GithubRepo";

class ProfileGithub extends Component {
  state = {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
    clientSecret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
    count: 6,
    sort: "created: asc",
    repos: []
  };

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log("error!!!", err));
  }

  render() {
    const { repos } = this.state;
    let repoItems;
    if (repos.message === "Not Found") return null;
    repoItems = (
      <div className="profile__github__latestrepos">
        {repos.map(repo => <GithubRepo repo={repo} key={repo.id} />)}
      </div>
    );

    return (
      <div className="profile__github" ref="myRef">
        <h3 className="profile__github__title">
          Github Contributions in the Last Year
        </h3>
        <img
          className="profile__github__contributions"
          src={`http://ghchart.rshah.org/${this.props.username}`}
          alt="leemun1's Github chart"
        />
        <h3 className="profile__github__title">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
