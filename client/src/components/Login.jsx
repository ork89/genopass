import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

export const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth);

	useEffect(() => {
		if (isError) toast.error(message);

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isSuccess, isError, message, navigate, dispatch]);

	const onChange = event => {
		const { name, value } = event.target;

		setFormData(prevData => {
			return {
				...prevData,
				[name]: value,
			};
		});
	};

	const handleSubmit = event => {
		event.preventDefault();

		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) return <Spinner />;

	return (
		<div className='container'>
			<section className='heading'>
				<h1>Login</h1>
			</section>

			<section className='form'>
				<form>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='email'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Password'
							autoComplete='password'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button className='loginBtn' onClick={handleSubmit}>
							Login
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};
