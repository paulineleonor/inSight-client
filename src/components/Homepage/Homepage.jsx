import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Header from "../Header/Header";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        leftButtonDestination={"/login"}
        leftButtonText={"login"}
        rightButtonDestination={"/signup"}
        rightButtonText={"signup"}
      />
      <section className="homepage__hero"></section>
      <h1 className="homepage__title">inSight</h1>
      <p className="homepage__tagline">Keep an eye on your loved ones</p>
      <Button
        action={() => {
          navigate("/login");
        }}
        text={"Get started"}
      />
    </div>
  );
};

export default Homepage;
