import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import CalendarIcon from "../../assets/Icons/calendar.svg";
import HeartIcon from "../../assets/Icons/heart.svg";
import ChartIcon from "../../assets/Icons/chart.svg";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import Arrow from "../../assets/Icons/arrow.svg";

const SkeletonProfile = () => {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [showConnections, setShowConnections] = useState(false);

  const { name } = useParams();

  const navigate = useNavigate();

  const handleArrowClick = () => {
    setShowConnections(!showConnections);
  };

  const handleLogout = () => {
    localStorage.removeItem("JWT Token");
    navigate("/login");
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
        <p>Welcome! &hearts;</p>

        <div className="dashboard__buttons">
          <Link to="#report">Your report</Link>
          <Link to="#calendar">Your past data</Link>
          <Link to={`/profile/${name}/connections`}>Your connections</Link>
        </div>

        <div className="dashboard__tracker">
          <Link to={`/profile/${name}/moodtracker`} className="dashboard__link">
            Fill out your daily tracker!
          </Link>
        </div>

        <div className="report" id="report">
          <h2 className="report__title">Your 7-day report:</h2>
          <div className="report__container">
            <div className="report__wrapper">
              <img src={ChartIcon} alt="" className="report__icon" />
              <h3 className="report__header">Your average mood</h3>
              <p className="report__average">0/10</p>
            </div>
            <div className="report__wrapper">
              <img src={HeartIcon} alt="" className="report__icon" />

              <h3 className="report__header">Your moods this week</h3>
            </div>

            <div className="report__wrapper report__wrapper--right">
              <img src={CalendarIcon} alt="" className="report__icon" />

              <h3 className="report__header">Your logged events</h3>
            </div>
          </div>
        </div>
        <div className="calendar" id="calendar">
          <h2 className="calendar__title">Your past entries</h2>
          <p className="calendar__subtitle">
            Click on the day to see your mood!
          </p>
          <Calendar value={calendarValue} maxDate={calendarValue} />
        </div>

        <div className="connections">
          <div className="connections__wrapper">
            {" "}
            <h2 className="connections__title">Your connections (0)</h2>
            <img
              src={Arrow}
              alt=""
              className="connections__icon"
              onClick={handleArrowClick}
            />
          </div>

          <article className="connections__card">
            <p className="connections__text">
              You don't have any connections yet.
            </p>
            <Link to={`/profile/${name}/connections/search`}>
              Add connections
            </Link>
            ;
          </article>
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

export default SkeletonProfile;
