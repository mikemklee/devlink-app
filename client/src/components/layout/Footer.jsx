import React from "react";

import Icon from "../common/Icon";

export default () => {
  return (
    <footer>
      <span>Copyright &copy; {new Date().getFullYear()} Devlink</span>
      <a href="https://github.com/leemun1" target="_blank">
        <Icon name="github" />
      </a>
    </footer>
  );
};
