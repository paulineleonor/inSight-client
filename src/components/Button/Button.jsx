import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <div onClick={props.action} className={`button ${props.class}`}>
      {props.text}
    </div>
  );
};

export default Button;
