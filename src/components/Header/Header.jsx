import { Link } from "react-router-dom";
import "./Header.scss";

import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <h2 className="header__title">inSight</h2>
      </Link>
      <nav className="nav">
        {" "}
        <Link to={props.leftButtonDestination} className="nav__link">
          {props.leftButtonText}
        </Link>
        <Link
          onClick={props.onClick}
          to={props.rightButtonDestination}
          className="nav__link nav__link--signup"
        >
          {props.rightButtonText}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
