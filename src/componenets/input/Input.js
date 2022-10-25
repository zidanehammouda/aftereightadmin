import React from "react";
import "./input.css";

const Input = ({ InputName, value, LabelText, handleChange, type }) => {
  return (
    <div class="input_container">
      <label class="input">
        {type !== "textarea" ? (
          <input
            name={InputName}
            class="input__field"
            type={type}
            value={value || ""}
            onChange={handleChange}
          />
        ) : (
          <textarea
            name={InputName}
            class="input__field"
            type={type}
            value={value || ""}
            onChange={handleChange}
          />
        )}
        <span class="input__label">{LabelText}</span>
      </label>
    </div>
  );
};
export default Input;
