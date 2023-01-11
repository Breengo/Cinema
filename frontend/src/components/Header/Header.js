import React from "react";
import { Link } from "react-router-dom";
import { apiURL } from "../../App";

import arrow from "../../images/Arrow_Image.svg";

export default function Header({ films }) {
  const [bgPos1, setBgPos1] = React.useState(
    films.films[films.films.length - 1]
  );
  const [bgPos2, setBgPos2] = React.useState(
    films.films[films.films.length - 4]
  );
  const [bgPos3, setBgPos3] = React.useState(
    films.films[films.films.length - 3]
  );
  const [bgPos4, setBgPos4] = React.useState(
    films.films[films.films.length - 5]
  );
  const [bgPos5, setBgPos5] = React.useState(
    films.films[films.films.length - 2]
  );

  const [slide, setSlide] = React.useState(false);

  const [timer, setTimer] = React.useState(8);

  React.useEffect(() => {
    const interval = setInterval(
      () =>
        setTimer((timer) => {
          if (timer >= 1) {
            return timer - 1;
          } else {
            clickRightArrowHandler();
            return (timer = 8);
          }
        }),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  function clickRightArrowHandler() {
    if (!slide) {
      setSlide("slideRight ");
      setTimer(8);
      setTimeout(() => {
        setSlide(false);
        let temp = bgPos5;
        setBgPos5(bgPos1);
        setBgPos1(bgPos2);
        setBgPos2(bgPos3);
        setBgPos3(bgPos4);
        setBgPos4(temp);
      }, 1500);
    }
  }

  function clickLeftArrowHandler() {
    if (!slide) {
      setSlide("slideLeft ");
      setTimer(8);
      setTimeout(() => {
        setSlide(false);
        let temp = bgPos4;
        setBgPos4(bgPos3);
        setBgPos3(bgPos2);
        setBgPos2(bgPos1);
        setBgPos1(bgPos5);
        setBgPos5(temp);
      }, 1500);
    }
  }

  return (
    <header className="header">
      <div
        onClick={clickLeftArrowHandler}
        className="header_sideArrows header_left_side_arrow"
      >
        <img src={arrow} alt="error" />
      </div>
      <img
        className={slide ? slide + "headerImg" : "headerImg"}
        src={apiURL + bgPos5.preview}
        alt="error"
      />
      <img
        className={slide ? slide + "headerImg" : "headerImg"}
        src={apiURL + bgPos1.preview}
        alt="error"
      />
      <Link to={"/film_details/" + bgPos2.id}>
        <img
          className={slide ? slide + "headerImg" : "headerImg"}
          src={apiURL + bgPos2.preview}
          alt="error"
        />
        <div
          className={
            slide ? slide + " hidden bannerInfo" : "visible bannerInfo"
          }
        >
          <h2>{bgPos2.filmName}</h2>
          <h3>
            {bgPos2.description.length > 500
              ? bgPos2.description
                  .slice(0, 600)
                  .slice(0, bgPos2.description.slice(0, 600).lastIndexOf(".")) +
                "..."
              : bgPos2.description}
          </h3>
        </div>
        <ul
          className={
            slide ? slide + " hidden banner_genres" : "visible banner_genres"
          }
        >
          {bgPos2.genres.split(",").map((genre) => {
            return <li key={genre}>{genre}</li>;
          })}
        </ul>
      </Link>
      <img
        className={slide ? slide + "headerImg" : "headerImg"}
        src={apiURL + bgPos3.preview}
        alt="error"
      />
      <img
        className={slide ? slide + "headerImg" : "headerImg"}
        src={apiURL + bgPos4.preview}
        alt="error"
      />
      <div
        onClick={clickRightArrowHandler}
        className="header_sideArrows header_right_side_arrow"
      >
        <img src={arrow} alt="error" />
      </div>
    </header>
  );
}
