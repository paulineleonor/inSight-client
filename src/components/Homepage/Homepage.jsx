import React from "react";
import { useNavigate } from "react-router-dom";
import Video from "../../assets/Videos/homepage_video.mp4";
import Button from "../Button/Button";
import Header from "../Header/Header";
import "./Homepage.scss";
import Footer from "../Footer/Footer";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header
        leftButtonDestination={"/login"}
        leftButtonText={"Log in"}
        rightButtonDestination={"/signup"}
        rightButtonText={"Sign up"}
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
              navigate("/signup");
            }}
            text={"Get started"}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
