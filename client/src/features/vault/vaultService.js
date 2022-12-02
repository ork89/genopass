import axios from 'axios';

const API_URL = '/api/vault/';

// Create a new password
const createPassword = async (passwordData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, passwordData, config);

	return response.data;
};

// Get users passwords
const getPasswords = async token => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data;
};

const deletePassword = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + id, config);

	return response.data;
};

const updatePassword = async (passwordData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL + passwordData._id, passwordData, config);
	return response.data;
};

const passwordService = {
	createPassword,
	getPasswords,
	deletePassword,
	updatePassword,
};

export default passwordService;
