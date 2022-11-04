import axios from "axios";
import jwt_decode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./MoodTracker.scss";

const MoodTracker = () => {
  const navigate = useNavigate();

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

    const decodedUserId = jwt_decode(token);

    let event = null;

    if (e.target.event.value) {
      event = e.target.event.value;
    }

    const newLog = {
      user_id: decodedUserId.id,
      score: e.target.mood_rating.value,
      mood: e.target.mood_name.value,
      event: event,
    };

    await axios.post("http://localhost:8081/moods", newLog);

    setTimeout(() => {
      navigate(`/profile/${decodedUserId.name}`);
    }, 2000);
  };

  return (
    <div>
      <Header />

      <section className="tracker">
        <form
          action="submit"
          className="form"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="form__container">
            <label htmlFor="mood_rating">
              On a scale of 0 to 10, how are you feeling today?
            </label>
            <input type="radio" name="mood_rating" id="mood_rating" value="0" />
            <input type="radio" name="mood_rating" id="mood_rating" value="1" />
            <input type="radio" name="mood_rating" id="mood_rating" value="2" />
            <input
              type="radio"
              name="mood_rating"
              id="mood_rating"
              value="3"
            />{" "}
            <input type="radio" name="mood_rating" id="mood_rating" value="4" />{" "}
            <input type="radio" name="mood_rating" id="mood_rating" value="5" />{" "}
            <input type="radio" name="mood_rating" id="mood_rating" value="6" />{" "}
            <input type="radio" name="mood_rating" id="mood_rating" value="7" />
            <input type="radio" name="mood_rating" id="mood_rating" value="8" />
            <input type="radio" name="mood_rating" id="mood_rating" value="9" />
            <input
              type="radio"
              name="mood_rating"
              id="mood_rating"
              value="10"
            />
          </div>

          <div>
            <label htmlFor="mood_name">What is your dominant mood today?</label>
            <select name="mood_name" id="mood_name">
              {moodsArray.map((mood) => {
                return <option value={mood}>{mood}</option>;
              })}
            </select>
          </div>

          <div>
            <label htmlFor="mood_name">
              Have any notable events happened today? (panic attacks, anxiety,
              etc.)
            </label>
            <input type="text" name="event" id="event" />
          </div>

          <button>Submit</button>
        </form>
      </section>
    </div>
  );
};

export default MoodTracker;
