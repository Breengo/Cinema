import React from "react";
import { useDispatch, useSelector } from "react-redux";

import debounce from "lodash.debounce";

import {
  hideSearchLine,
  searchLineSelector,
} from "../../Redux/WindowsManagementSlice.js";
import { filmListSelector } from "../../Redux/filmList";
import { Link } from "react-router-dom";

import searchIcon from "../../images/Search_Image.svg";
import closeIcon from "../../images/back.svg";
import { apiURL } from "../../App.js";

export default function SearchLine() {
  const dispatch = useDispatch();
  const selector = useSelector(searchLineSelector.getSearchLine);
  const filmList = useSelector(filmListSelector.getFilmList);

  const [disappear, setDisappear] = React.useState(false);
  const [unblur, setUnblur] = React.useState(false);
  const [search, setSearch] = React.useState(null);

  React.useEffect(() => {
    setDisappear(false);
    setUnblur(false);
  }, [selector]);

  function closeSearchLine() {
    setDisappear(true);
    setUnblur(true);
    setTimeout(() => {
      dispatch(hideSearchLine());
    }, 500);
  }

  const inputText = React.useCallback(
    debounce((e) => {
      console.log("dafs");
      setSearch(e.target.value);
    }, 250)
  );

  return (
    <div>
      {selector && (
        <div
          className={unblur ? "unblur transparent blur_block" : "blur_block"}
        >
          <img
            onClick={closeSearchLine}
            className="closeSearch"
            src={closeIcon}
            alt="error"
          />
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="search_line"
          >
            <div className="search_line_inputBox">
              <input
                onChange={(e) => {
                  inputText(e);
                }}
                type="text"
              />
              <img src={searchIcon} alt="error" />
            </div>
          </div>
          <div className="search_line__searched_box">
            {filmList.films
              .filter(
                (item) =>
                  search &&
                  item.filmName.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => {
                return (
                  <SearchBox
                    closeSearchLine={closeSearchLine}
                    key={item.id}
                    film={item}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchBox({ film, closeSearchLine }) {
  return (
    <Link
      to={`/film_details/${film.id}`}
      onClick={closeSearchLine}
      className="searchBox"
    >
      <img src={apiURL + film.preview} alt="error" />
      <h2 className="searchBox__filmName">{film.filmName}</h2>
      <p className="searchBox_filmDescription">
        {film.description.length > 300
          ? film.description.slice(
              0,
              film.description.slice(0, 300).lastIndexOf(".")
            ) + "..."
          : film.description}
      </p>
      <h3 className="searchBox_filmType">
        {film.type} <span>{film.year}</span>
      </h3>
      <ul className="searchBox_filmGenres">
        {film.genres.split(",").map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <h3 className="searchBox_filmDuration">{film.duration} Minutes</h3>
    </Link>
  );
}
