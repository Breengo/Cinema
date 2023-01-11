import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import remove from "../../images/remove.svg";

import { fetchUploadFilm, isUploaded } from "../../Redux/contentFunctions";

export default function AddContent() {
  const [preview, setPreview] = React.useState("Preview");
  const [videoPreview, setVideoPreview] = React.useState("Video");

  const dispatch = useDispatch();
  let uploadInfo = useSelector(isUploaded);
  const navigate = useNavigate();

  function onUploadVideo(e) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      setVideoPreview(fileReader.result);
    };
  }

  function onUploadPreview(e) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
  }

  if (uploadInfo) {
    dispatch(fetchUploadFilm());
    navigate(-1);
  }

  function onSubmit(e) {
    e.preventDefault();
    const year = e.target[18].value;
    let duration = document.getElementById("content_add_video").duration;
    duration = (duration - (duration % 60)) / 60;
    const filmName = e.target[0].value;
    const description = e.target[1].value;
    const video = e.target[2].files[0];
    const preview = e.target[3].files[0];
    const token = window.localStorage.getItem("token");
    let type = "";
    let genres = "";
    for (let i = 4; i < 7; i++) {
      if (e.target[i].checked) {
        type = e.target[i].value;
      }
    }
    for (let i = 7; i < 18; i++) {
      if (e.target[i].checked) {
        genres += e.target[i].value + ", ";
      }
    }
    if (
      !year ||
      !filmName ||
      !description ||
      !video ||
      !preview ||
      !type ||
      !genres
    ) {
      return alert("Not all fields are filled");
    }
    genres = genres.slice(0, -2);
    dispatch(
      fetchUploadFilm({
        filmName,
        description,
        duration,
        video,
        preview,
        token,
        type,
        genres,
        year,
      })
    );
  }

  const GenreList = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Thriller",
    "Western",
    "Sci-Fi",
    "Historical",
  ];
  return (
    <div className="mainBackground">
      <div className="content_add">
        <h2>Add content</h2>
        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          className="content_add_form"
          action="submit"
        >
          <div className="content_add_filmInfo">
            <input
              placeholder="Film name"
              className="content_add_textInput"
              id="content_add_FilmName"
              type="text"
            />
            <textarea
              placeholder="Film sinopsis"
              className="content_add_textArea"
              name="Description"
              cols="30"
              rows="10"
            ></textarea>
            <div className="add_content_uploadFunction">
              <input
                onChange={(e) => onUploadVideo(e)}
                id="uploadFilm"
                className="content_add_uploadFile"
                name="uploadFilm"
                type="file"
              />
              <label
                className="content_add_uploadFile_label"
                htmlFor="uploadFilm"
              >
                {videoPreview.includes("/") && (
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      setVideoPreview("Video");
                    }}
                    id="content_add_removeVideo"
                    src={remove}
                    alt="error"
                  />
                )}
                {videoPreview.includes("/") ? (
                  <video id="content_add_video" src={videoPreview} controls />
                ) : (
                  videoPreview
                )}
              </label>
            </div>
          </div>
          <div className="content_add_fileUpload">
            <div className="add_content_uploadFunction">
              <input
                onChange={(e) => onUploadPreview(e)}
                id="uploadPreview"
                className="content_add_uploadFile"
                name="uploadFilm"
                type="file"
              />
              <label
                className="content_add_uploadFile_label"
                htmlFor="uploadPreview"
              >
                {preview.includes("/") ? (
                  <img src={preview} alt="error" />
                ) : (
                  preview
                )}
              </label>
            </div>
            <div className="content_add_typeChoice">
              <div className="content_add_typeBox">
                <h4>Film</h4>
                <input value="Film" type="radio" name="type" />
              </div>
              <div className="content_add_typeBox">
                <h4>Cartoon</h4>
                <input value="Cartoon" type="radio" name="type" />
              </div>
              <div className="content_add_typeBox">
                <h4>TV series</h4>
                <input value="TV series" type="radio" name="type" />
              </div>
            </div>
            <div className="content_add_genreList">
              {GenreList.map((item, index) => {
                return (
                  <div key={index} className="content_add_genreBox">
                    <h4>{item}</h4>
                    <div>
                      <input
                        className="custom_checkbox"
                        name={index.toString() + "label"}
                        value={item}
                        type="checkbox"
                      />
                      <label htmlFor={index.toString() + "label"}></label>
                    </div>
                  </div>
                );
              })}
            </div>
            <input
              placeholder="Year"
              className="content_add_year"
              type="text"
            />
            <div className="add_content_submitForm">
              <input type="submit" className="add_content_btn" value="Upload" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
