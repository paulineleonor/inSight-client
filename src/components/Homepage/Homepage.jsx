import React from "react";
import { useNavigate } from "react-router-dom";
import Video from "../../assets/Videos/homepage_video.mp4";
import Button from "../Button/Button";
import Header from "../Header/Header";
import "./Homepage.scss";

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
      <section className="homepage">
        <video
          src={Video}
          autoPlay
          loop
          muted
          className="homepage__video"
        ></video>
        <div className="homepage__content">
          {" "}
          <p className="homepage__title">inSight</p>
          <p className="homepage__tagline">Keep an eye on your loved ones</p>
          <Button
            action={() => {
              navigate("/login");
            }}
            text={"Get started"}
          />
        </div>
      </section>
    </div>
  );
};

export default Homepage;
