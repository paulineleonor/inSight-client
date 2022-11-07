import axios from "axios";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Button from "../Button/Button";

const Connections = () => {
  const [users, setUsers] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.get(`URL=?q=${e.target.value}`);

    setUsers(data);
  };

  return (
    <div>
      <Header />
      <form action="">
        <input type="text" />
        <button>Submit</button>
      </form>

      <Footer />
    </div>
  );
};

export default Connections;
