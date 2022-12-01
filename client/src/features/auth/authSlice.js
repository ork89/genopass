import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const loggedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: loggedUser ? loggedUser : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Register new user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		console.log({ user });
		return await authService.register(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		console.log({ error });
		return thunkAPI.rejectWithValue(message);
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = '';
		},
	},
	// this extra reducer is what handles the response from the registration
	extraReducers: builder => {
		builder
			.addCase(register.pending, state => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload; // if registration is successful the user data is being passed as payload by 'authService.register'
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload; // the payload is whats being returned by 'thunkAPI.rejectWithValue'
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
