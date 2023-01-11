const Router = require('express');
const router = new Router();
const FilmController = require('../controllers/filmController');
const checkRole = require('../middleware/checkRoleMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/post_film', checkRole('ADMIN'), FilmController.create);
router.get('/film_details/:id', FilmController.getOne);
router.get('/film_list', FilmController.getAll);
router.delete('/film_delete', checkRole('ADMIN'), FilmController.removeOne);

module.exports = router;
