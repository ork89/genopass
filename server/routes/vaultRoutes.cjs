const express = require('express');
const router = express.Router();
const {
	getPasswords,
	getPassword,
	setPassword,
	updatePassword,
	deletePassword,
} = require('../controllers/vaultController.cjs');

const { protect } = require('../middleware/authMiddleware.cjs');

router.get('/', protect, getPasswords);

router.get('/:id', protect, getPassword);

router.post('/', protect, setPassword);

router.put('/:id', protect, updatePassword);

router.delete('/:id', protect, deletePassword);

module.exports = router;
