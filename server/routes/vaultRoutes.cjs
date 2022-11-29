const express = require('express');
const router = express.Router();
const {
	getPasswords,
	getPassword,
	setPassword,
	updatePassword,
	deletePassword,
} = require('../controllers/vaultController.cjs');

router.get('/', getPasswords);

router.get('/:id', getPassword);

router.post('/', setPassword);

router.put('/:id', updatePassword);

router.delete('/:id', deletePassword);

module.exports = router;
