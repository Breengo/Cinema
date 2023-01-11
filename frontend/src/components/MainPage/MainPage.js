import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmList, filmListSelector } from '../../Redux/filmList';

import Header from '../Header/Header.js';
import GenreSection from '../GenreSection/GenreSection.js';
import PopularFilms from '../PopularFilms/PopularFilms.js';

import img from '../../images/prev1.jpg';

export default function MainPage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchFilmList());
  }, []);

  const selector = useSelector(filmListSelector.getFilmList);

  return (
    <div className="mainBackground">
      {selector && selector.films[4] && <Header films={selector} />}
      {!selector && <img className="HeaderloaderImg" src={img} alt='error' />}
      <GenreSection />
      <PopularFilms />
    </div>
  );
}
