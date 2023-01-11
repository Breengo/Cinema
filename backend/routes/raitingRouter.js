const Router = require('express')
const router = new Router()
const RaitingController = require('../controllers/raitingController');
const authMiddleWare = require('../middleware/authMiddleware')



router.post('/estimate', authMiddleWare, RaitingController.create);
router.get('/estimation', authMiddleWare,RaitingController.getOne);
router.get('/average', RaitingController.getAll);


module.exports = router