import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, redirect } from "react-router-dom";

import { selectAuth } from "../../Redux/auth.js";

import ChangeUserInfo from "../ChangeUserInfo/ChangeUserInfo";
import {
  showChangePassword,
  showChangeEmail,
} from "../../Redux/changeUserInfoSlice";
import { apiURL } from "../../App.js";

export default function UserProfile() {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectAuth);

  if (isAuth == null) {
    redirect("/");
  }

  return (
    <section className="mainBackground">
      {isAuth && (
        <div className="user_profile">
          <div className="user_profile_card">
            <div className="user_profile_now">
              <img src={`${apiURL}${isAuth.image}`} alt="error" />
              <div className="user_profile_info">
                <h2>{isAuth.name}</h2>
                <h3>Email: {isAuth.email}</h3>
              </div>
            </div>
            <div className="user_profile_functions">
              <button
                onClick={() => {
                  dispatch(showChangeEmail());
                }}
                className="btn"
              >
                Change email
              </button>
              <button
                onClick={() => {
                  dispatch(showChangePassword());
                }}
                className="btn"
              >
                Change password
              </button>
              {isAuth.role === "ADMIN" && (
                <Link to="/add_content/">
                  <button className="btn">Add Content</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <ChangeUserInfo />
    </section>
  );
}
