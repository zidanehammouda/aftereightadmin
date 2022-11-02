import React from "react";
import "./input.css";

const Input = ({ InputName, value, LabelText, handleChange, type }) => {
  return (
    <div class="input_container">
      <label class="input__label" for={InputName}>
        {LabelText}
      </label>
      {type !== "textarea" ? (
        <input
          name={InputName}
          id={InputName}
          class="input__field"
          type={type}
          value={value || ""}
          onChange={handleChange}
        />
      ) : (
        <textarea
          name={InputName}
          id={InputName}
          class="input__field"
          type={type}
          value={value || ""}
          onChange={handleChange}
        />
      )}
    </div>
  );
};
export default Input;
