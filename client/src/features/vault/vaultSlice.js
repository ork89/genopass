import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vaultService from './vaultService';

const initialState = {
	vault: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: '',
};

// create new password
export const createPassword = createAsyncThunk('vault/create', async (passwordData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		console.log({ token });
		return await vaultService.createPassword(passwordData, token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Get user vault and passwords
export const getPasswords = createAsyncThunk('vault/getAll', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await vaultService.getPasswords(token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Delete a password
export const deletePassword = createAsyncThunk('vault/delete', async (id, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;

		return await vaultService.deletePassword(id, token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Update a password
export const updatePassword = createAsyncThunk('vault/update', async (passwordData, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.user.token;
		return await vaultService.updatePassword(passwordData, token);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const vaultSlice = createSlice({
	name: 'vault',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {
		builder
			.addCase(createPassword.pending, state => {
				state.isLoading = true;
			})
			.addCase(createPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.vault.push(action.payload); // action.payload = the newly created password
			})
			.addCase(createPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // action.payload = error message
			})
			.addCase(getPasswords.pending, state => {
				state.isLoading = true;
			})
			.addCase(getPasswords.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.vault = action.payload; // action.payload = the newly created password
			})
			.addCase(getPasswords.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // action.payload = error message
			})
			.addCase(deletePassword.pending, state => {
				state.isLoading = true;
			})
			.addCase(deletePassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.vault = state.vault.filter(pwd => pwd._id !== action.payload.id);
			})
			.addCase(deletePassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // action.payload = error message
			})
			.addCase(updatePassword.pending, state => {
				state.isLoading = true;
			})
			.addCase(updatePassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const {
					arg: { id },
				} = action.meta;
				if (id) {
					state.vault = state.vault.map(pwd => {
						pwd._id === id ? action.payload : pwd;
					});
				}
			})
			.addCase(updatePassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // action.payload = error message
			});
	},
});

export const { reset } = vaultSlice.actions;
export default vaultSlice.reducer;
