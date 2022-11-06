import React from "react";
import "./Footer.scss";
import LinkedIn from "../../assets/Icons/linkedin.svg";
import Email from "../../assets/Icons/email.svg";
import Github from "../../assets/Icons/github.svg";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__title">inSight</p>
      <div className="footer__social">
        <a
          href="https://www.linkedin.com/in/pauline-jeremie/"
          className="footer__link"
        >
          <img src={LinkedIn} alt="" className="footer__icon" />
        </a>
        <a
          href="https://github.com/paulineleonor/inSight-client"
          className="footer__link"
        >
          <img src={Github} alt="" className="footer__icon" />
        </a>
        <a
          href="https://github.com/paulineleonor/inSight-server"
          className="footer__link"
        >
          <img src={Github} alt="" className="footer__icon" />
        </a>
        <a href="mailto:pauline.jeremie@gmail.com" className="footer__link">
          <img src={Email} alt="" className="footer__icon" />
        </a>
      </div>
      <p className="footer__rights">By Pauline Jérémie</p>
    </div>
  );
};

export default Footer;
