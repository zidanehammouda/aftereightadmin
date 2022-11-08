import React, { useRef } from "react";
import "./input.css";

const Input = ({ InputName, value, LabelText, handleChange, type, id }) => {
  const myInput = useRef(null);
  const myInputContainer = useRef(null);

  return (
    <div class="input_container" ref={myInputContainer}>
      <label
        onClick={() => myInput.current.focus()}
        class={value ? "input__label label_value" : "input__label"}
        htmlFor={InputName}
        // style={{
        //   backgroundColor:
        //     myInputContainer.current &&
        //     window
        //       .getComputedStyle(myInputContainer.current.parentElement, null)
        //       .getPropertyValue("background-color"),
        // }}
      >
        {LabelText}
      </label>
      {type !== "textarea" ? (
        <input
          ref={myInput}
          name={InputName}
          id={id}
          class="input__field"
          type={type}
          value={value || ""}
          onChange={handleChange}
          color={
            myInputContainer.current &&
            window
              .getComputedStyle(myInputContainer.current.parentElement, null)
              .getPropertyValue("background-color")
          }
        />
      ) : (
        <textarea
          ref={myInput}
          name={InputName}
          id={id}
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
