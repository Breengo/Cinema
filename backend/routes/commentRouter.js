const Router = require('express')
const router = new Router()
const CommentController = require('../controllers/commentController')
const authMiddleWare = require('../middleware/authMiddleware')


router.post('/newComment', authMiddleWare,CommentController.create)
router.get('/comment',CommentController.getOne)
router.get('/comments/:id',CommentController.getAll )


module.exports = router