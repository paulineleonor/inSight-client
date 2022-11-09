import axios from "axios";
import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Connections.scss";
import ChartIcon from "../../assets/Icons/chart.svg";
import CalendarIcon from "../../assets/Icons/calendar.svg";
import HeartIcon from "../../assets/Icons/heart.svg";

const Connections = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setfailedAuth] = useState(false);
  const [connections, setConnections] = useState();

  const [connectionsMoods, setConnectionsMoods] = useState();

  useEffect(() => {
    const token = localStorage.getItem("JWT Token");
    if (!token) {
      return setfailedAuth(true);
    }
    // Get the data from the API
    axios
      .get("http://localhost:8081/users/connections", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);

        setConnections(response.data.connectionsInfo);
        setConnectionsMoods(response.data.connectionMoods);

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

  // const showDataArrow = () => {
  //   setShowData(!showData);
  // };

  // const filterConnectionMoods = () => {
  //   const filteredMoods = connections.moods_logs.filter((mood) => {
  //     return moment(mood.created_at).isAfter(moment().subtract(7, "days"));
  //   });
  // };

  // const userConnectionMoods =

  return (
    <div>
      <Header
        leftButtonDestination={`/profile/${
          user ? user.userInformation.first_name : ""
        }`}
        leftButtonText={"Profile"}
        rightButtonDestination={"/login"}
        rightButtonText={"Sign out"}
      />
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
                  <p className="connection__name">
                    {connection.first_name} {connection.last_name}
                  </p>
                </div>

                <div className="connection__stats">
                  <p className="connection__subtitle">Their 7-day report:</p>
                  <div className="connection__wrapper">
                    <div className="connection__container">
                      <img
                        src={ChartIcon}
                        alt=""
                        className="connection__icon"
                      />
                      <p className="connection__heading">Their score</p>
                      {connectionsMoods
                        .filter(
                          (connectionMood) =>
                            connectionMood.user_id === connection.id
                        )
                        .map((mood) => {
                          return (
                            <div>
                              <p>{mood.score}</p>
                            </div>
                          );
                        })}
                    </div>

                    <div className="connection__container">
                      <img
                        src={HeartIcon}
                        alt=""
                        className="connection__icon"
                      />
                      <p className="connection__heading">Their moods</p>
                      {connectionsMoods
                        .filter(
                          (connectionMood) =>
                            connectionMood.user_id === connection.id
                        )
                        .map((mood) => {
                          return (
                            <div>
                              <p>{mood.mood}</p>
                            </div>
                          );
                        })}
                    </div>

                    <div className="connection__container connection__container--right">
                      {" "}
                      <img
                        src={CalendarIcon}
                        alt=""
                        className="connection__icon"
                      />
                      <p className="connection__heading">Their events</p>
                      {connectionsMoods
                        .filter(
                          (connectionMood) =>
                            connectionMood.user_id === connection.id
                        )
                        .map((mood) => {
                          return (
                            <div>
                              <p>{mood.event}</p>
                            </div>
                          );
                        })}
                    </div>

                    {/* {!connectionsMoods.filter(
                        (connectionMood) =>
                          connectionMood.user_id === connection.id
                      ).event && <p>No data...</p>} */}

                    {/* {JSON.stringify(
                        connectionsMoods.filter(
                          (connectionMood) =>
                            connectionMood.user_id === connection.id
                        )
                      )} */}

                    {/* Todo: Calculate average of mood scores */}
                    {/* {connectionsMoods
                        .filter((connectionMood) => {
                          return (
                            connectionMood.user_id === connection.id &&
                            moment(connectionMood.created_at).isAfter(
                              moment().subtract(7, "days")
                            )
                          );
                        })
                        .reduce((previousValue, currentValue) => {
                          return previousValue + currentValue, 0;
                        })} */}
                  </div>
                </div>
              </article>
            );
          })}
          <Link
            to={`/profile/${user ? user.userInformation.first_name : ""}`}
            className="connections__link"
          >
            <Button text="Back to my profile" class="button--profile" />
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Connections;
