import React from "react";

const Icon = ({ name, color }) => (
  <svg>
    <use xlinkHref={`/img/sprite.svg#icon-${name}`} fill={color} />
  </svg>
);

export default Icon;
