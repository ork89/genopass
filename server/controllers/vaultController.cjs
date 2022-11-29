const asyncHandler = require('express-async-handler');
const Vault = require('../models/vaultModel.cjs');
const User = require('../models/userModel.cjs');

// @desc    Get all passwords
// @route   GET /api/vault
// @access  Private
const getPasswords = asyncHandler(async (req, res) => {
	const passwords = await Vault.find({ user: req.user.id });
	res.status(200).json(passwords);
});

// @desc    Get a password
// @route   GET /api/vault/:id
// @access  Private
const getPassword = asyncHandler(async (req, res) => {
	const pwdId = req.params.id;
	const password = await Vault.findById(pwdId);

	if (!password) {
		res.status(400);
		throw new Error(`Password with ID: ${id} does not exist`);
	}

	res.status(200).json(password);
});

// @desc    Set a password
// @route   POST /api/vault
// @access  Private
const setPassword = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please use a text field');
	}

	const password = await Vault.create({
		text: req.body.text,
		user: req.user.id,
	});
	res.status(200).json(password);
});

// @desc    Update password
// @route   PUT /api/vault/:id
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const password = await Vault.findById(id);

	if (!password) {
		res.status(400);
		throw new Error(`Password with ID: ${id} not found`);
	}

	// Get logged user
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error(`User with ID: ${id} not found`);
	}

	// Make sure that the password belongs to the logged user
	if (password.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedPwd = await Vault.findByIdAndUpdate(id, req.body, { new: true });

	res.status(200).json(updatedPwd);
});

// @desc    Delete password
// @route   DELETE /api/vault
// @access  Private
const deletePassword = asyncHandler(async (req, res) => {
	const pwdId = req.params.id;
	const password = await Vault.findById(pwdId);

	if (!password) {
		res.status(400);
		throw new Error(`Password with ID: ${pwdId} does not exist`);
	}

	// Get logged user
	const user = await User.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error(`User with ID: ${id} not found`);
	}

	// Make sure that the password belongs to the logged user
	if (password.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	// const passwordToDelete = await Vault.findByIdAndDelete(id);
	await password.remove();

	// res.status(200).json(passwordToDelete);
	res.status(200).json({ id: pwdId });
});

module.exports = {
	getPasswords,
	getPassword,
	setPassword,
	updatePassword,
	deletePassword,
};
