const router = require('express').Router();
const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

// 🌍 PUBLIC NOTES (NO LOGIN)
router.get('/public', noteController.getAllPublicNotes);

// 🔐 PROTECTED
router.use(authMiddleware);

router.post('/', noteController.addNote);
router.get('/my', noteController.getMyNotes);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
