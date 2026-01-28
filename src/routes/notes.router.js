const router = require('express').Router();
const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.post('/',noteController.createNote);
router.get('/',noteController.getNotes);
router.delete('/:id',noteController.delete);

module.exports = router;