const asyncHandler = require('express-async-handler');

// @desc    Get all passwords
// @route   GET /api/vault
// @access  Private
const getPasswords = asyncHandler(async (req, res) => {
	res.status(200).json({ message: 'Get passwords' });
});

// @desc    Get a password
// @route   GET /api/vault/:id
// @access  Private
const getPassword = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Get password ${req.params.id}` });
});

// @desc    Set a password
// @route   POST /api/vault
// @access  Private
const setPassword = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please use a text field');
	}
	res.status(200).json({ message: 'Set Password' });
});

// @desc    Update password
// @route   PUT /api/vault/:id
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Update password ${req.params.id}` });
});

// @desc    Delete password
// @route   DELETE /api/vault
// @access  Private
const deletePassword = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `Delete password ${req.params.id}` });
});

module.exports = {
	getPasswords,
	getPassword,
	setPassword,
	updatePassword,
	deletePassword,
};
