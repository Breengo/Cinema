import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { filmListSelector } from "../../Redux/filmList";
import { apiURL } from "../../App";

export default function PopularFilms() {
  const selector = useSelector(filmListSelector.getFilmList);

  return (
    <section className="PopFilmsSection">
      {selector && selector.films[0] && (
        <>
          <div className="animateTitle animateTitle_popFilms">
            <h2 className="section_title section_title_popFilms">
              <span>P</span>
              <span>O</span>
              <span>P</span>
              <span>U</span>
              <span>L</span>
              <span>A</span>
              <span>R</span>
            </h2>
          </div>
          <div className="PopFilms_mainSection">
            {selector.films.map((item) => {
              return (
                <Link key={item.id} to={`/film_details/${item.id}`}>
                  <FilmBox
                    description={item.description}
                    duration={item.duration}
                    genres={item.genres}
                    filmName={item.filmName}
                    filmPreview={apiURL + item.preview}
                  />
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export function FilmBox({
  filmPreview,
  filmName,
  genres,
  duration,
  description,
}) {
  return (
    <div className="film_box">
      <div className="filmPreview film_box_filmPreview">
        <img src={filmPreview} alt="error" />
      </div>
      <p className="film_box_filmName">{filmName}</p>
      <div className="film_box_filmDescription">
        <p>{duration} Minutes</p>
        <ul>
          {genres.split(",").map((genre) => {
            return <li key={genre}>{genre}</li>;
          })}
        </ul>
      </div>
      <p className="film_box_description">
        {description.length < 250
          ? description
          : description.slice(0, [description.slice(0, 500).lastIndexOf(".")]) +
            "..."}
      </p>
    </div>
  );
}
