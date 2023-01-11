const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const filmRouter = require('./filmRouter')
const commentRouter = require('./commentRouter')
const raitingRouter = require('./raitingRouter')


router.use('/user',userRouter)
router.use('/comments',commentRouter)
router.use('/film',filmRouter)
router.use('/raiting',raitingRouter)


module.exports = router