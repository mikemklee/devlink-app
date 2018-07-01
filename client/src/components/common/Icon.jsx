import React from "react";

const Icon = ({ name, color = "black" }) => (
  <svg>
    <use xlinkHref={`/img/sprite.svg#icon-${name}`} fill={color} />
  </svg>
);

export default Icon;
