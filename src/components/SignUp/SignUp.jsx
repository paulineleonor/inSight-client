import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./SignUp.scss";

const SignUp = () => {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const { data } = await axios.post("http://localhost:8081/users", newUser);
    console.log(data);

    localStorage.setItem("JWT Token", data);
    navigate("/profile/" + e.target.first_name.value);
  };

  return (
    <div>
      <Header
        leftButtonDestination={"/"}
        leftButtonText={"Home"}
        rightButtonDestination={"/login"}
        rightButtonText={"Log in"}
      />
      <section className="loginpage">
        <h1 className="loginpage__title">Create an account</h1>
        <div className="loginpage__container">
          {" "}
          <form
            className="form"
            action="submit"
            onSubmit={(e) => submitHandler(e)}
          >
            <label className="form__label" htmlFor="first_name">
              First name
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First Name"
              className="form__input"
            />
            <label className="form__label" htmlFor="last_name">
              Last name
            </label>

            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Last Name"
              className="form__input"
            />
            <label className="form__label" htmlFor="email">
              Email
            </label>

            <input
              className="form__input"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
            />
            <label className="form__label" htmlFor="password">
              Password
            </label>

            <input
              type="text"
              name="password"
              id="password"
              placeholder="Password"
              className="form__input"
            />
            <label className="form__label" htmlFor="confirm_password">
              Confirm password
            </label>

            <input
              type="text"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm password"
              className="form__input"
            />
            <button className="form__button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
