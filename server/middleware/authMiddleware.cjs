const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.cjs');

const protect = asyncHandler(async (req, res, next) => {
	let token;
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.startsWith('Bearer')) {
		try {
			// Get token from header
			token = authHeader.split(' ')[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get the user from the tokens payload
			req.user = await User.findById(decoded.id).select('-password');

			// Call next middleware
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('Authorization Failed');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Authorization failed because there's no token");
	}
});

module.exports = { protect };
