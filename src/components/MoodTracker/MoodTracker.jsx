import axios from "axios";
import jwt_decode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./MoodTracker.scss";
import { useState } from "react";
import Heart from "../../assets/Icons/heart.svg";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";

const MoodTracker = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const moodsArray = [
    "happy",
    "stressed",
    "angry",
    "sad",
    "afraid",
    "anxious",
    "other",
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("JWT Token");

    const decodedUser = jwt_decode(token);

    let event = null;

    if (e.target.event.value) {
      event = e.target.event.value;
    }

    const newLog = {
      user_id: decodedUser.id,
      score: e.target.mood_rating.value,
      mood: e.target.mood_name.value,
      event: event,
    };

    await axios.post("http://localhost:8081/moods", newLog);

    setUser(decodedUser.name);
    console.log(decodedUser);

    setTimeout(() => {
      navigate(`/profile/${decodedUser.name}`);
    }, 2000);
  };

  return (
    <div>
      <Header
        leftButtonDestination={`/profile/${user}`}
        leftButtonText={"My profile"}
        // Fix connections link
        rightButtonDestination={`/profile/${user ? user : ""}/connections`}
        rightButtonText={"Connections"}
      />

      <section className="tracker">
        <h2 className="tracker__title">Your daily mood tracker</h2>
        <p className="tracker__subtitle">
          Fill out the form below so your loved ones know how you're doing!
        </p>
        <form
          action="submit"
          className="tracker__form"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="tracker__container">
            <label htmlFor="mood_rating" className="tracker__label">
              On a scale of 0 to 10, how are you feeling today?
            </label>
            <div className="tracker__inner">
              {" "}
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="0"
                className="tracker__radio"
              />
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="1"
                className="tracker__radio"
              />
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="2"
                className="tracker__radio"
              />
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="3"
                className="tracker__radio"
              />
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="4"
                className="tracker__radio"
              />{" "}
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="5"
                className="tracker__radio"
              />{" "}
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="6"
                className="tracker__radio"
              />{" "}
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="7"
                className="tracker__radio"
              />
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="8"
                className="tracker__radio"
              />
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="9"
                className="tracker__radio"
              />
              <input
                type="radio"
                name="mood_rating"
                id="mood_rating"
                value="10"
                className="tracker__radio"
              />
            </div>
            <div className="tracker__inner">
              <p className="tracker__grade">Not good</p>
              <p className="tracker__grade">Excellent</p>
            </div>
          </div>

          <div className="tracker__container">
            <label htmlFor="mood_name" className="tracker__label">
              What is your dominant mood today?
            </label>
            <select name="mood_name" id="mood_name" className="tracker__option">
              {moodsArray.map((mood) => {
                return <option value={mood}>{mood}</option>;
              })}
            </select>
          </div>

          <div className="tracker__container">
            <label htmlFor="mood_name" className="tracker__label">
              Have any notable events happened today? (Panic attack, etc.)
            </label>
            <input
              type="text"
              name="event"
              id="event"
              className="tracker__text"
            />
          </div>
          <button className="tracker__button">Submit</button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default MoodTracker;
