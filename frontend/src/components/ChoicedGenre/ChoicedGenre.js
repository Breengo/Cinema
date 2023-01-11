import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilmList, filmListSelector } from "../../Redux/filmList";

import { Link, useParams } from "react-router-dom";

import { FilmBox } from "../PopularFilms/PopularFilms";
import FilmSkeleton from "../ChoicedType/FilmSkeleton.js";
import { apiURL } from "../../App";

export default function ChoicedGenre() {
  const genre = useParams().genre;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchFilmList());
    window.scrollTo(0, 0);
  }, []);

  const selector = useSelector(filmListSelector.getFilmList);

  return (
    <div className="mainBackground choiced_genre">
      <h1>{genre}</h1>
      <div className="PopFilms_mainSection">
        {selector &&
          selector.films
            .filter((item) => item.genres.includes(genre))
            .map((item) => {
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
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
        {!selector && <FilmSkeleton />}
      </div>
    </div>
  );
}
