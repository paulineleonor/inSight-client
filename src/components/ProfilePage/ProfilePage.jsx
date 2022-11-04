import axios from "axios";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./ProfilePage.scss";
import moment from "moment";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setfailedAuth] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);

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

    return moodsAverage;
  };

  const filteredMoods = user.moods.filter((mood) => {
    console.log(moment(mood.created_at).isAfter(moment().subtract(7, "days")));
    return moment(mood.created_at).isAfter(moment().subtract(7, "days"));
  });

  const dayClickHandler = (e) => {
    const selectedDay = user.moods.filter((mood) => {
      return moment(e).isSame(mood.created_at, "day");
    });

    setSelectedDay(selectedDay[0]);
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
        <p>Welcome back, {first_name}!</p>
        <div className="tracker">
          <h2 className="tracker__title">Fill out your daily tracker:</h2>
          <Link to={`/profile/${first_name}/moodtracker`}>Get started</Link>
        </div>

        <div>
          <h2>Your 7-day report:</h2>
          <div>
            <div>
              <h3>Your average mood</h3>
              <p>{moodsAverage()}/10</p>
              {/* <p>{moodsAverage()} / 10</p> */}
            </div>
            <div>
              <h3>Your moods this week</h3>
              {filteredMoods.map((mood) => {
                return <p>{mood.mood}</p>;
              })}
            </div>

            <div>
              <h3>Your logged events</h3>
              {user.moods.map((log) => {
                return <p>{log.event}</p>;
              })}
            </div>
          </div>
        </div>

        <Calendar
          value={calendarValue}
          maxDate={calendarValue}
          onClickDay={(e) => dayClickHandler(e)}
        />

        {selectedDay && <p>{selectedDay.mood}</p>}

        {!selectedDay && <p>Nothing...</p>}

        <button className="dashboard__logout" onClick={handleLogout}>
          Log out
        </button>
      </main>
    </div>
  );
};
export default ProfilePage;
