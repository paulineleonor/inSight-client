import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./ProfilePage.scss";
import moment from "moment";
import ChartIcon from "../../assets/Icons/chart.svg";
import "react-calendar/dist/Calendar.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setfailedAuth] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [hasEvents, setHasEvents] = useState(false);
  const [averageIsGood, setAverageIsGood] = useState(false);

  const navigate = useNavigate();

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
        console.log(response.data);
      })
      .catch((error) => {
        // setfailedAuth
        //    true
        // );
      });
  }, []);

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

  const filteredMoods = user.moods.filter((mood) => {
    return moment(mood.created_at).isAfter(moment().subtract(7, "days"));
  });

  const dayClickHandler = (e) => {
    const selectedDay = user.moods.filter((mood) => {
      return moment(e).isSame(mood.created_at, "day");
    });

    setSelectedDay(selectedDay[0]);
  };

  const checkForEvents = () => {
    const arrayOfEvents = [];

    filteredMoods.forEach((mood) => {
      if (mood.event !== null) {
        arrayOfEvents.push(mood.event);
      }
    });

    if (arrayOfEvents.length !== 0) {
      setHasEvents(true);
    }
  };

  checkForEvents();

  // const trackerModal = () => {
  //   console.log(
  //     moment(user.moods[user.moods.length - 1].created_at).isSame(moment()._d)
  //   );
  // };

  // trackerModal();
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
        <div className="dashboard__tracker">
          <Link
            to={`/profile/${first_name}/moodtracker`}
            className="dashboard__link"
          >
            Fill out your daily tracker!
          </Link>
        </div>

        <div className="report">
          <h2 className="report__title">Your 7-day report:</h2>
          <div className="report__container">
            <div className="report__wrapper">
              <img src={ChartIcon} alt="" />
              <h3 className="report__header">Your average mood</h3>
              <p className="report__average">{moodsAverage()}/10</p>
            </div>
            <div className="report__wrapper">
              <h3 className="report__header">Your moods this week</h3>
              {filteredMoods.map((mood) => {
                return <p className="report__moods">{mood.mood}</p>;
              })}
            </div>
            <div className="report__wrapper report__wrapper--right">
              <h3 className="report__header">Your logged events</h3>
              {!hasEvents && (
                <p className="report__event">No event this week!</p>
              )}

              {hasEvents &&
                filteredMoods.map((log) => {
                  return <p className="report__event">{log.event}</p>;
                })}
            </div>
          </div>
        </div>

        <div className="calendar">
          <h2>Your past entries</h2>
          <p>Click on the day to see your mood!</p>
          <Calendar
            value={calendarValue}
            maxDate={calendarValue}
            onClickDay={(e) => dayClickHandler(e)}
          />
          {selectedDay && (
            <div className="dayLog">
              <p className="dayLog__title">
                Here's what your logged for that day:
              </p>
              <div className="dayLog__container">
                <p className="dayLog__mood">{selectedDay.mood}</p>
                <p className="dayLog__score">{selectedDay.score}</p>
                <p className="dayLog__event">{selectedDay.event}</p>
              </div>
            </div>
          )}
          {!selectedDay && <p>Not tracker filled out that day!</p>}
        </div>

        <button className="dashboard__logout" onClick={handleLogout}>
          Log out
        </button>
      </main>
    </div>
  );
};
export default ProfilePage;
