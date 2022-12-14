import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import "./UserSearch.scss";

const UserSearch = () => {
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("JWT Token");
    const decodedUser = jwt_decode(token);
    console.log(decodedUser.first_name);
    setCurrentUser(decodedUser);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsers();

    const { data } = await axios.get(
      `http://localhost:8081/users/search?email=${e.target.user_email.value}`
    );

    setUsers(data);
  };

  const handleConnect = async () => {
    const token = localStorage.getItem("JWT Token");
    const decodedUser = jwt_decode(token);

    setCurrentUser(decodedUser);

    const connection = {
      user_id: decodedUser.id,
      connection_id: users[0].id,
    };

    console.log(decodedUser);
    await axios.post("http://localhost:8081/users/connection", connection);
  };

  return (
    <div>
      <Header
        leftButtonDestination={`/profile/${
          currentUser ? currentUser.first_name : ""
        }`}
        leftButtonText={"Profile"}
        rightButtonDestination={"/login"}
        rightButtonText={"Sign out"}
      />
      <div className="search">
        <div className="search__container">
          {" "}
          <h2 className="search__title">Connect with your loved ones!</h2>
          <p>Enter a contact's email above to connect with them.</p>
          <div className="search__search">
            {" "}
            <form
              className="search__form"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input
                type="text"
                name="user_email"
                id="user_email"
                className="search__input"
                placeholder="Your loved one's email address"
              />
              <button type="submit" className="search__submit">
                Submit
              </button>
            </form>
          </div>
          {users && (
            <article className="search__result">
              <p className="search__name">
                {users[0].first_name} {users[0].last_name}
              </p>
              <button onClick={handleConnect} className="search__button">
                Connect
              </button>
            </article>
          )}
        </div>

        <Link
          to={`/profile/${currentUser ? currentUser.first_name : ""}`}
          className="connections__link"
        >
          <Button text="Back to my profile" class="button--profile" />
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default UserSearch;
