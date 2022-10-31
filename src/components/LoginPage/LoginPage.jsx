import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
    <form action="submit" onSubmit={(e) => submitHandler(e)}>
      <input
        type="text"
        name="first_name"
        id="first_name"
        placeholder="first name"
      />
      <input
        type="text"
        name="last_name"
        id="last_name"
        placeholder="last name"
      />
      <input type="text" name="email" id="email" placeholder="email" />
      <input type="text" name="password" id="password" placeholder="password" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginPage;
