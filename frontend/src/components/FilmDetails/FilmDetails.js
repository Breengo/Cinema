import React from "react";

import {
  createUserComment,
  fetchFilmComments,
  filmCommentsSelector,
} from "../../Redux/commentSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router";
import axios from "../../axios";
import { checkAuthUser, selectAuth } from "../../Redux/auth";
import { apiURL } from "../../App";

export default function FilmDetails() {
  const dispatch = useDispatch();
  const filmComments = useSelector(filmCommentsSelector.getFilmComments);

  const params = useParams();
  const isAuth = useSelector(selectAuth);
  const navigate = useNavigate();

  const [raiting, setRaiting] = React.useState(0);
  const [details, setDetails] = React.useState(null);
  const [commentText, setCommentText] = React.useState("");
  const [avgRait, setAvgRait] = React.useState("");

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    dispatch(checkAuthUser(token));
  }, []);

  function resetStars() {
    if (raiting === 0) {
      const stars = document.querySelectorAll(".star");
      stars.forEach((star) => (star.innerHTML = "&#9734"));
    }
  }

  function onStar(i) {
    const stars = document.querySelectorAll(".star");
    if (raiting === 0) {
      stars.forEach((star, j) => {
        if (j < i) {
          star.innerHTML = "&#9733;";
        } else {
          star.innerHTML = "&#9734";
        }
      });
    }
  }

  async function onRait(i) {
    setRaiting(i);
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, j) => {
      if (j < i) {
        star.innerHTML = "&#9733;";
      } else {
        star.innerHTML = "&#9734";
      }
    });
    const token = window.localStorage.getItem("token");
    axios.post(
      "/raiting/estimate",
      { value: i, filmId: params.id },
      {
        headers: {
          authorization: token,
        },
      }
    );
  }

  function resizeTexarea(e) {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight + 5}px`;
  }

  React.useEffect(() => {
    const stars = document.querySelectorAll(".star");
    const token = window.localStorage.getItem("token");
    dispatch(fetchFilmComments({ id: params.id }));
    axios.get(`/raiting/average?filmId=${params.id}`).then((item) => {
      setAvgRait(item.data);
    });
    axios
      .get(`/raiting/estimation?filmId=${params.id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((item) => {
        if (item.data) {
          setRaiting(item.data.value);
        }
      });
    const res = axios.get(`/film/film_details/${params.id}`);
    res.then((item) => {
      setDetails(item.data);
    });
    stars.forEach((star, j) => {
      if (j < raiting) {
        star.innerHTML = "&#9733;";
      } else {
        star.innerHTML = "&#9734";
      }
    });
  }, []);

  React.useEffect(() => {
    const stars = document.querySelectorAll(".star");
    if (raiting !== 0) {
      stars.forEach((star, j) => {
        if (j < raiting) {
          star.innerHTML = "&#9733;";
        } else {
          star.innerHTML = "&#9734";
        }
      });
    }
  }, [raiting]);

  function commentInput(e) {
    resizeTexarea(e);
    setCommentText(e.target.value);
  }

  function createComment() {
    const token = window.localStorage.getItem("token");
    dispatch(
      createUserComment({ content: commentText, filmId: params.id, token })
    );
    setCommentText("");
  }

  function deleteHandler() {
    const token = window.localStorage.getItem("token");
    axios
      .delete(`/film/film_delete?id=${details.id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        navigate("/");
      });
  }

  return (
    <section className="mainBackground">
      {details && (
        <div className="film_details">
          <h2 className="film_details_filmName">{details.filmName}</h2>
          <div className="film_details_up">
            <img
              className="film_details_preview"
              src={`${apiURL}${details.preview}`}
              alt=""
            />
            <div className="film_details_text">
              <h3>{details.type}</h3>
              <h3>
                Year: <span>{details.year}</span>
              </h3>
              <h3>
                Duration: <span>{details.duration}</span> Minutes
              </h3>
              <div className="film_details_genreList">
                <h3>Genres:</h3>
                <ul className="film_details_genres">
                  {details.genres.split(",").map((item) => {
                    return <li key={item}>{item}</li>;
                  })}
                </ul>
              </div>
              <div className="film_details_raiting">
                <span>{avgRait}</span>
                <div onMouseLeave={resetStars} className="film_details_stars">
                  <button
                    onClick={() => {
                      onRait(1);
                    }}
                    onMouseOver={(e, i = 1) => onStar(i)}
                    className={
                      raiting !== 0 ? "star film_details_raited" : "star"
                    }
                  >
                    &#9734;
                  </button>
                  <button
                    onClick={() => {
                      onRait(2);
                    }}
                    onMouseOver={(e, i = 2) => onStar(i)}
                    className={
                      raiting !== 0 ? "star film_details_raited" : "star"
                    }
                  >
                    &#9734;
                  </button>
                  <button
                    onClick={() => {
                      onRait(3);
                    }}
                    onMouseOver={(e, i = 3) => onStar(i)}
                    className={
                      raiting !== 0 ? "star film_details_raited" : "star"
                    }
                  >
                    &#9734;
                  </button>
                  <button
                    onClick={() => {
                      onRait(4);
                    }}
                    onMouseOver={(e, i = 4) => onStar(i)}
                    className={
                      raiting != 0 ? "star film_details_raited" : "star"
                    }
                  >
                    &#9734;
                  </button>
                  <button
                    onClick={() => {
                      onRait(5);
                    }}
                    onMouseOver={(e, i = 5) => onStar(i)}
                    className={
                      raiting !== 0 ? "star film_details_raited" : "star"
                    }
                  >
                    &#9734;
                  </button>
                </div>
              </div>
              {isAuth && isAuth.role === "ADMIN" && (
                <div className="film_details_deleteWrapper">
                  <h1 onClick={deleteHandler} className="film_details_delete">
                    Delete
                  </h1>
                </div>
              )}
            </div>
          </div>
          <p className="film_details_description">{details.description}</p>
          <video
            className="film_details_video"
            controls
            src={`${apiURL}${details.video}`}
          />
          <div className="film_details_comment">
            <div className="film_details_commentTextInput">
              <textarea
                value={commentText}
                required
                onChange={(e) => {
                  commentInput(e);
                }}
                placeholder="Add comment"
              />
            </div>
            <button onClick={createComment}>Send</button>
          </div>
          {filmComments && (
            <div className="film_details_commentsBlock">
              {filmComments.comment.map((comment) => {
                return (
                  <UserComment
                    users={filmComments.users}
                    key={comment.id}
                    comment={comment}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function UserComment({ comment, users }) {
  let user = users.filter((item) => item.id === comment.userId);
  const commentDate = comment.createdAt.slice(0, 10);
  return (
    <div className="user_comment_box">
      <img src={`${apiURL}${user[0].userImage}`} alt="error" />
      <div className="user_comment_text">
        <h3>{user[0].userName}</h3>
        <p>{comment.content}</p>
        <span>{commentDate.replaceAll("-", ".")}</span>
      </div>
    </div>
  );
}
