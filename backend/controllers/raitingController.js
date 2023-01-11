const { Raiting } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize')


class RaitingController {
    async create(req, res) {
        const { value, filmId } = req.body
        const id = req.user.id
        const user = await Raiting.findOne({ where: { [Op.and]: [{ userId: id }, { filmId }] } })
        let raiting;
        if (user) {
            raiting = await Raiting.update({ value }, { where: { [Op.and]: [{ userId: id }, { filmId }] } })
        }
        else {
            raiting = await Raiting.create({ value, filmId, userId: id })
        }
        return res.json(raiting)
    }

    async getAll(req, res) {
        const { filmId } = req.query
        const raiting = await Raiting.findAll({ where: { filmId: filmId } });
        if (raiting.length > 0) {
            const avgRait = raiting.map((item) => item.dataValues.value).reduce((prev, cur) => prev + cur);
            return res.json((avgRait / raiting.length).toFixed(2))
        }
        else{
            return res.json('');
        }
    }

    async getOne(req, res) {
        const { filmId } = req.query
        const userId = req.user.id
        const raiting = await Raiting.findOne({
            where: {
                [Op.and]: [{ filmId }, { userId }]
            }
        })
        return res.json(raiting)
    }
}

module.exports = new RaitingController()