import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const UserSearch = () => {
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    await axios.post("http://localhost:8081/users/connection", connection);
  };

  return (
    <div>
      <Header />
      <div>
        {" "}
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input type="text" name="user_email" id="user_email" />
          <button type="submit">Submit</button>
        </form>
      </div>

      {users && (
        <div>
          <p>{users[0].first_name}</p>
          <p>{users[0].last_name}</p>
          <button onClick={handleConnect}>Connect</button>
        </div>
      )}

      {!users && (
        <div>Enter your loved one's email above to connect with them.</div>
      )}

      <div>
        <Link to={`/profile/${currentUser}`}>
          {" "}
          <Button text="Back to my profile" />
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default UserSearch;
