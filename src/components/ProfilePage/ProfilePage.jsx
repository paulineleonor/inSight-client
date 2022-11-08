import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./ProfilePage.scss";
import moment from "moment";
import ChartIcon from "../../assets/Icons/chart.svg";
import "react-calendar/dist/Calendar.css";
import CalendarIcon from "../../assets/Icons/calendar.svg";
import HeartIcon from "../../assets/Icons/heart.svg";
import { Children } from "react";
import Arrow from "../../assets/Icons/arrow.svg";
import Button from "../Button/Button";
import SkeletonProfile from "../SkeletonProfile/SkeletonProfile";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setfailedAuth] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [hasEvents, setHasEvents] = useState(false);
  const [averageIsGood, setAverageIsGood] = useState(false);
  const [currentDayIsEmpty, setCurrentDayIsEmpty] = useState(true);
  const [chosenDayHasEvents, setChosenDayHasEvents] = useState(false);

  const [isToday, setIsToday] = useState(true);
  const [chosenDayData, setChosenDayData] = useState(null);
  const [moods, setMoods] = useState([]);

  const [userHasConnections, setUserHasConnections] = useState(false);

  const [showConnections, setShowConnections] = useState(false);

  const [arrayOfEvents, setArrayOfEvents] = useState([]);

  const navigate = useNavigate();

  const calendarClickHandler = (date) => {
    if (moment(date).isSame(moment(), "day")) {
      setIsToday(true);
    } else {
      setIsToday(false);
    }
    const data = user.moods.find((mood) => {
      return moment(date).isSame(mood.created_at, "day");
    });
    setChosenDayData(data);
  };

  const checkForEvents = (moodsArray) => {
    if (!moodsArray) {
      return;
    }

    const arrayOfEvents = [];
    moodsArray.forEach((mood) => {
      if (mood.event !== null) {
        arrayOfEvents.push(mood.event);
      }
    });
    setArrayOfEvents(arrayOfEvents);
    console.log(arrayOfEvents);

    if (arrayOfEvents.length !== 0) {
      setHasEvents(true);
    }
  };

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
        const filteredMoods = response.data.moods.filter((mood) => {
          return moment(mood.created_at).isAfter(moment().subtract(7, "days"));
        });

        if (response.data.connections.length) {
          setUserHasConnections(true);
        }

        const data = response.data.moods.find((mood) => {
          return moment().isSame(mood.created_at, "day");
        });

        setChosenDayData(data);
        setMoods(filteredMoods);
        checkForEvents(filteredMoods);
      })
      .catch((error) => {
        // setfailedAuth
        //    true
        // );
      });
  }, []);

  // useEffect(() => {
  //   // if (moods.length !== 0) {
  //   checkForEvents();
  //   // }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("JWT Token");
    navigate("/login");
  };

  if (failedAuth) {
    return (
      <main className="dashboard">
        <p>
          You must be logged in to see this page.{" "}
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }
  if (!user) {
    return (
      <main className="dashboard">
        <p>Loading...</p>
      </main>
    );
  }

  const { first_name, email } = user.userInformation;

  const moodsAverage = () => {
    let moodsTotal = 0;

    const moodsCopy = [...user.moods];

    // console.log(user.moods);

    let moodsArray = moodsCopy.splice(0, 7);

    // console.log(user.moods);

    moodsArray.forEach((mood) => {
      moodsTotal += mood.score;
    });

    const moodsAverage = moodsTotal / moodsArray.length;

    if (moodsArray > 5) {
      setAverageIsGood(true);
    }

    return moodsAverage;
  };

  // const filteredMoods = user.moods.filter((mood) => {
  //   return moment(mood.created_at).isAfter(moment().subtract(7, "days"));
  // });

  if (moods.length === 0) {
    return <SkeletonProfile />;
  }

  const handleArrowClick = () => {
    setShowConnections(!showConnections);
  };

  return (
    <div>
      <Header
        leftButtonDestination={"/"}
        leftButtonText={"Home"}
        rightButtonDestination={"/login"}
        rightButtonText={"Sign out"}
      />
      <main className="dashboard">
        <h1 className="dashboard__title">Your dashboard</h1>
        <p>Welcome back, {first_name}! &hearts;</p>

        <div className="dashboard__buttons">
          <Link to="#report">Your report</Link>
          <Link to="#calendar">Your past data</Link>
          <Link
            to={`/profile/${
              user ? user.userInformation.first_name : ""
            }/connections`}
          >
            Your connections
          </Link>
        </div>

        {!chosenDayData && isToday && (
          <div className="dashboard__tracker">
            <Link
              to={`/profile/${first_name}/moodtracker`}
              className="dashboard__link"
            >
              Fill out your daily tracker!
            </Link>
          </div>
        )}

        <div className="report" id="report">
          <h2 className="report__title">Your 7-day report:</h2>
          <div className="report__container">
            <div className="report__wrapper">
              <img src={ChartIcon} alt="" className="report__icon" />
              <h3 className="report__header">Your average mood</h3>
              <p className="report__average">{moodsAverage()}/10</p>
            </div>
            <div className="report__wrapper">
              <img src={HeartIcon} alt="" className="report__icon" />

              <h3 className="report__header">Your moods this week</h3>
              {moods.map((mood) => {
                return <p className="report__moods">{mood.mood}</p>;
              })}
            </div>

            <div className="report__wrapper report__wrapper--right">
              <img src={CalendarIcon} alt="" className="report__icon" />

              <h3 className="report__header">Your logged events</h3>
              {!hasEvents && (
                <p className="report__event">No event this week!</p>
              )}

              {hasEvents &&
                arrayOfEvents.map((log) => {
                  return <p className="report__event">{log}</p>;
                })}
            </div>
          </div>
        </div>
        <div className="calendar">
          <h2 className="calendar__title">Your past entries</h2>
          <p className="calendar__subtitle">
            Click on the day to see your mood!
          </p>
          <Calendar
            id="calendar"
            value={calendarValue}
            maxDate={calendarValue}
            onClickDay={(e) => {
              calendarClickHandler(e);
            }}
          />

          {chosenDayData && (
            <div className="dayLog">
              <p className="dayLog__title">
                Here's what your logged for that day:
              </p>
              <div className="report__container">
                <div className="report__wrapper">
                  <img src={ChartIcon} alt="" className="report__icon" />
                  <h3 className="report__header">Your score</h3>
                  <p className="report__average">{chosenDayData.score}/10</p>
                </div>
                <div className="report__wrapper">
                  <img src={HeartIcon} alt="" className="report__icon" />
                  <h3 className="report__header">Your mood</h3>
                  <p className="report__moods">{chosenDayData.mood}</p>
                </div>
                <div className="report__wrapper report__wrapper--right">
                  <img src={CalendarIcon} alt="" className="report__icon" />
                  <h3 className="report__header">Your logged events</h3>
                  {chosenDayHasEvents && (
                    <p className="report__event">No event this week!</p>
                  )}
                  {hasEvents && (
                    <p className="report__event">{chosenDayData.event}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {isToday && !chosenDayData && (
            <div className="dayLog">
              <p className="dayLog__title">
                You've not filled out your tracker for today!
              </p>
              <Link
                to={`/profile/${first_name}/moodtracker`}
                className="dayLog__button"
              >
                Log my moods
              </Link>
            </div>
          )}

          {!isToday && !chosenDayData && (
            <div className="dayLog">
              <p className="dayLog__text">No tracker filled out that day!</p>
            </div>
          )}
        </div>

        <div className="connections">
          <div className="connections__wrapper">
            {" "}
            <h2 className="connections__title">
              Your connections ({user.connections.length})
            </h2>
            <img
              src={Arrow}
              alt=""
              className="connections__icon"
              onClick={handleArrowClick}
            />
          </div>

          {showConnections && userHasConnections && (
            <>
              {user.connections.map((connection) => {
                return (
                  <article className="connections__card">
                    <p className="connections__text">
                      {connection.users.first_name} {connection.users.last_name}
                    </p>
                  </article>
                );
              })}
              <Link
                to={`/profile/${
                  user ? user.userInformation.first_name : ""
                }/connections`}
              >
                <Button text="Check on your loved ones" />
              </Link>
            </>
          )}

          {!userHasConnections && (
            <article className="connections__card">
              <p className="connections__text">
                You don't have any connections yet.
              </p>
              <Link
                to={`/profile/${
                  user ? user.userInformation.first_name : ""
                }/connections/search`}
              >
                Add connections
              </Link>
              ;
            </article>
          )}
        </div>

        <div className="dashboard__button">
          <button className="dashboard__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </main>
    </div>
  );
};
export default ProfilePage;
