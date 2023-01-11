import { Routes, Route } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";

import { checkAuthUser } from "./Redux/auth.js";

import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/MainPage/MainPage";
import Authorization from "./components/Authorization/Authorization";
import Registration from "./components/Registration/Registration.js";
import SearchLine from "./components/SearchLine/SearchLine.js";
import UserProfile from "./components/UserProfile/UserProfile.js";
import Footer from "./components/Footer/Footer.js";
import AddContent from "./components/AddContent/AddContent.js";
import FilmDetails from "./components/FilmDetails/FilmDetails.js";
import ChoicedGenre from "./components/ChoicedGenre/ChoicedGenre.js";
import ChoicedType from "./components/ChoicedType/ChoicedType.js";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(checkAuthUser(token));
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/add_content/" element={<AddContent />} />
        <Route path="/film_details/:id" element={<FilmDetails />} />
        <Route path="/genre/:genre" element={<ChoicedGenre />} />
        <Route path="/type/:type" element={<ChoicedType />} />
      </Routes>
      <SearchLine />
      <Authorization />
      <Registration />
      <Footer />
    </div>
  );
}

export default App;

export const apiURL = "http://localhost:4000/";
