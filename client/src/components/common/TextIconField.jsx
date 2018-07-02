import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import Icon from "../common/Icon";

const TextIconField = ({
  name,
  placeholder,
  label,
  value,
  error,
  icon,
  onChange
}) => {
  return (
    <div className="icon__field">
      {label && <h6 className="icon__field__label">{label}</h6>}
      <div className="icon__field__icon">
        <Icon name={icon} />
      </div>
      <input
        className={classnames("icon__field__input", {
          "icon__field__input--invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="icon__field__error">{error}</div>}
    </div>
  );
};

TextIconField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextIconField.defaultProps = {
  type: "text"
};

export default TextIconField;
