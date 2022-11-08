import axios from "axios";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import moment from "moment";
import { Link } from "react-router-dom";
import Arrow from "../../assets/Icons/arrow.svg";

const Connections = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setfailedAuth] = useState(false);
  const [connections, setConnections] = useState();
  const [connectionsMoods, setConnectionsMoods] = useState();
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT Token");
    if (!token) {
      return setfailedAuth(true);
    }
    // Get the data from the API
    axios
      .get("http://localhost:8081/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);

        setConnections(response.data.connections);

        console.log(response.data.connections);
      })
      .catch((error) => {
        // setfailedAuth
        //    true
        // );
      });
  }, []);

  if (!user) {
    return (
      <main className="dashboard">
        <p>Loading...</p>
      </main>
    );
  }

  const showDataArrow = () => {
    setShowData(!showData);
  };

  // const filterConnectionMoods = () => {
  //   const filteredMoods = connections.moods_logs.filter((mood) => {
  //     return moment(mood.created_at).isAfter(moment().subtract(7, "days"));
  //   });
  // };

  return (
    <div>
      <Header />

      {!connections && (
        <div className="connections">
          <h2 className="connections__title">
            You don't have any connections yet.
          </h2>
          <Link to={`/profile/${user.userInformation.id}/connections/search`}>
            <Button text="Search for loved ones" />
          </Link>
        </div>
      )}

      {connections && (
        <div className="connections">
          {" "}
          <h2 className="connections__title">Your loved ones</h2>
          {connections.map((connection, i) => {
            return (
              <article className="connection" key={i}>
                <div className="connection__inner">
                  <p>
                    {connection.users.first_name} {connection.users.last_name}
                  </p>
                  <div className="connection__container">
                    <p className="connection__subtitle">
                      See how they're doing
                    </p>
                    <img src={Arrow} alt="" onClick={showDataArrow} />
                  </div>
                </div>

                {showData && (
                  <div className="connection__stats">
                    <p className="connection__subtitle">Their 7-day report</p>
                    <div className="connection__wrapper">
                      <p className="connection__heading">Their score</p>
                      <p className="connection__score">
                        {connection.mood_logs.score}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Connections;
