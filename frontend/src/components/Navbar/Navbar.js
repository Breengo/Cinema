import React from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectAuth } from "../../Redux/auth.js";

import {
  showLoginWindow,
  showSearchLine,
} from "../../Redux/WindowsManagementSlice.js";

import userIcon from "../../images/User_Profile_Image.svg";
import searchIcon from "../../images/Search_Image.svg";
import userIconHover from "../../images/User_Profile_Image_Hover.svg";
import searchIconHover from "../../images/Search_Image_Hover.svg";
import { apiURL } from "../../App.js";

export default function () {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectAuth);

  const [hoverSearch, setHoverSearch] = React.useState(false);
  const [hoverProfile, setHoverProfile] = React.useState(false);
  const [hideClickMenu, setHideClickMenu] = React.useState(true);

  function onLogOutHandle() {
    window.localStorage.removeItem("token");
    setHideClickMenu(true);
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h1>Cinema</h1>
        </Link>
      </div>
      <div className="navbar_category">
        <ul>
          <li>
            <Link to="/type/Films">Films</Link>{" "}
          </li>
          <li>
            <Link to="/type/TV_series">TV series</Link>
          </li>
          <li>
            <Link to="/type/Cartoons">Cartoons</Link>
          </li>
        </ul>
      </div>
      <div className="search_input">
        <div
          onMouseOver={() => setHoverSearch(true)}
          onClick={() => {
            dispatch(showSearchLine());
          }}
          onMouseLeave={() => setHoverSearch(false)}
          id="hover_cotainer1"
          className="hover_container"
        >
          <img src={hoverSearch ? searchIconHover : searchIcon} alt="error" />
          <h2>Search</h2>
        </div>
      </div>
      <div className="nav_user_profile">
        {!isAuth && (
          <div
            onClick={() => {
              dispatch(showLoginWindow());
            }}
            onMouseOver={() => setHoverProfile(true)}
            onMouseLeave={() => setHoverProfile(false)}
            id="hover_cotainer2"
            className="hover_container"
          >
            <img src={hoverProfile ? userIconHover : userIcon} alt="error" />
            <h2>Sign In</h2>
          </div>
        )}
        {isAuth && (
          <div
            onClick={() => {
              hideClickMenu ? setHideClickMenu(false) : setHideClickMenu(true);
            }}
            className={
              hideClickMenu
                ? "navbar_user_profile"
                : "navbar_user_profile scale1"
            }
          >
            <img src={`${apiURL}${isAuth.image}`} alt="error" />
            <h2>{isAuth.name}</h2>
          </div>
        )}
        <div
          className={
            hideClickMenu
              ? "hide_userProfile_clickMenu navbar_userProfile_clickMenu"
              : "navbar_userProfile_clickMenu"
          }
        >
          <ul>
            <Link
              onClick={() => {
                setHideClickMenu(true);
              }}
              to="/user_profile/"
            >
              <li>Profile</li>
            </Link>
            <li onClick={onLogOutHandle}>Log Out</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
