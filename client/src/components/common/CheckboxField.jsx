import React from "react";

const CheckboxField = ({ name, value, checked, onChange, label }) => {
  return (
    <div className="checkbox__field">
      <input
        type="checkbox"
        className="checkbox__field__input"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        id={name}
      />
      <label htmlFor={name} className="checkbox__field__label">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
