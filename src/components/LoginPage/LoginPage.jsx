import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LoginPage = () => {
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const { data } = await axios.post(
      "http://localhost:8081/users/login",
      user
    );
    console.log(data);
    localStorage.setItem("JWT Token", data.token);
    navigate("/profile/" + jwt_decode(data.token).first_name);
  };

  useEffect(() => {
    const token = localStorage.getItem("JWT Token");
    if (token) {
      const decodedHeader = jwt_decode(token);

      navigate("/profile/" + decodedHeader.first_name);
    }
  }, []);

  return (
    <div>
      <Header />
      <section className="loginpage">
        <div className="loginpage__container">
          {" "}
          <form
            className="form"
            action="submit"
            onSubmit={(e) => submitHandler(e)}
          >
            <h1 className="loginpage__title">Sign in</h1>
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

            <button className="form__button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;
