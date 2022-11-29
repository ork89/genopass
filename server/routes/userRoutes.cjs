const express = require('express');
const router = express.Router();
const { registerUser, loginUser, GetCurrentUser } = require('../controllers/userController.cjs');
const { protect } = require('../middleware/authMiddleware.cjs');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/currentUser', protect, GetCurrentUser);

module.exports = router;
