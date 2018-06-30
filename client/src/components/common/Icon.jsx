import React from "react";

const Icon = ({ name, style = {} }) => (
  <svg>
    <use xlinkHref={`/img/sprite.svg#icon-${name}`} fill={style.fill} />
  </svg>
);

export default Icon;
