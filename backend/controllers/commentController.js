const { Comment, User } = require('../models/models');
const { Op } = require('sequelize')


class CommentController {
    async create(req, res) {
        const { content, filmId } = req.body
        const userId = req.user.id
        const comment = await Comment.create({ content, filmId, userId })
        return res.json(comment)
    }

    async getAll(req, res) {
        const { id } = req.params
        const comment = await Comment.findAll({ where: {filmId:id} });
        const temp = comment.map((item) => {
            return(item.userId)
        })
        let users = await User.findAll({where:{id:temp}})
        users = users.map((item) => {
            return {userName:item.userName,userImage:item.userImage, id:item.id};
        })
        return res.json({comment,users})
    }

    async getOne(req, res) {
        const { filmId, userId } = req.query
        const comment = await Comment.findOne({
            where: {
                [Op.and]: [{ filmId }, { userId }]
            }
        })
        return res.json(comment)
    }
}

module.exports = new CommentController()