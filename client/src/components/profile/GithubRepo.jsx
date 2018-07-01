import React from "react";

import getLanguageColor from "../../utils/getLanguageColor";

import Icon from "../common/Icon";

const GithubRepo = ({ repo }) => {
  const languageColor = getLanguageColor(repo.language);
  return (
    <a href={repo.html_url} target="_blank" className="profile__github__repo">
      <h4 className="profile__github__repo__name">{repo.name}</h4>
      <p className="profile__github__repo__description">{repo.description}</p>
      <div className="profile__github__repo__meta">
        <div className="profile__github__repo__meta__item">
          <Icon name="circle" color={languageColor} />
          <span>{repo.language || "Unknown"}</span>
        </div>
        {repo.stargazers_count !== 0 && (
          <div className="profile__github__repo__meta__item">
            <Icon name="star" />
            <span>{repo.stargazers_count}</span>
          </div>
        )}
        {repo.forks_count !== 0 && (
          <div className="profile__github__repo__meta__item">
            <Icon name="git-branch" />
            <span>{repo.forks_count}</span>
          </div>
        )}
      </div>
    </a>
  );
};

export default GithubRepo;
