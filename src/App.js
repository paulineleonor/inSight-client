import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Homepage from "./components/Homepage/Homepage";
import LoginPage from "./components/LoginPage/LoginPage";
import MoodTracker from "./components/MoodTracker/MoodTracker";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import SignUp from "./components/SignUp/SignUp";
import Connections from "./components/Connections/Connections";
import UserSearch from "./components/UserSearch/UserSearch";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile/:name" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:name/moodtracker" element={<MoodTracker />} />
          <Route path="/profile/:name/connections" element={<Connections />} />
          <Route
            path="/profile/:name/connections/search"
            element={<UserSearch />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
