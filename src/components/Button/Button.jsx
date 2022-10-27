import React from "react";

const Button = (props) => {
  return <div onClick={props.action}>{props.text}</div>;
};

export default Button;
