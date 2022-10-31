import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [failedAuth, setfailedAuth] = useState(false);

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
        setUser(response.data.userInformation);
        console.log(response.data);
      })
      .catch((error) => {
        // setfailedAuth
        //    true
        // );
      });
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setfailedAuth(true);
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
  const { first_name, last_name, email } = user;
  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>
      <p>
        Welcome back, {first_name} {last_name}! :wave:
      </p>
      <h2>My Profile</h2>
      <p>Email: {email}</p>
      <button className="dashboard__logout" onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
};
export default ProfilePage;
