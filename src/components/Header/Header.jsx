import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

import React from "react";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>inSight</h2>
      <div>
        {" "}
        <Link to={props.leftButtonDestination}>{props.leftButtonText}</Link>
        <Link to={props.leftButtonDestination}>{props.rightButtonText}</Link>
      </div>
    </div>
  );
};

export default Header;
