const mongoose = require('mongoose');

const vaultSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Name is required'],
		},
		url: {
			type: String,
		},
		userName: {
			type: String,
			required: [true, 'User name is required'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		category: {
			type: String,
		},
		comments: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Vault', vaultSchema);
