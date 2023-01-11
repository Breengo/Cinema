const uuid = require("uuid");
const path = require("path");

const ApiError = require("../error/ApiError");
const { Film } = require("../models/models");
const { Op } = require("sequelize");
const fs = require("fs");

class FilmController {
  async create(req, res, next) {
    try {
      const { filmName, description, genres, duration, type, year } = req.body;
      const { video, preview } = req.files;
      const videoName = uuid.v4() + ".mp4";
      const previewName = uuid.v4() + ".jpg";
      video.mv(path.resolve(__dirname, "..", "static", videoName));
      preview.mv(path.resolve(__dirname, "..", "static", previewName));
      const film = await Film.create({
        filmName,
        description,
        genres,
        video: videoName,
        duration,
        preview: previewName,
        type,
        year,
      });
      console.log(film);
      return res.status(200).json({ message: "Successfully uploaded." });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const films = await Film.findAll();

    return res.json({ films });
  }

  async getOne(req, res) {
    const { id } = req.params;
    const film = await Film.findOne({ where: { id } });
    return res.json(film);
  }

  async removeOne(req, res) {
    try {
      const { id } = req.query;
      const film = await Film.findOne({ where: { id } });
      if (film) {
        if (film.preview) {
          if (
            fs.existsSync(path.resolve(__dirname, "..", "static", film.preview))
          ) {
            fs.unlinkSync(
              path.resolve(__dirname, "..", "static", film.preview)
            );
          }
        }
        if (film.video) {
          if (
            fs.existsSync(path.resolve(__dirname, "..", "static", film.video))
          ) {
            fs.unlinkSync(path.resolve(__dirname, "..", "static", film.video));
          }
        }
      }
      const succes = await Film.destroy({ where: { id } });
      return res.status(200).json(succes);
    } catch (error) {
      console.log(error);
      return res.status(404);
    }
  }
}

module.exports = new FilmController();
