import { Link } from "react-router-dom";
import "./Header.scss";

import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <h2 className="header__title">inSight</h2>
      <nav className="nav">
        {" "}
        <Link to={props.leftButtonDestination} className="nav__link">
          {props.leftButtonText}
        </Link>
        <Link
          to={props.leftButtonDestination}
          className="nav__link nav__link--signup"
        >
          {props.rightButtonText}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
