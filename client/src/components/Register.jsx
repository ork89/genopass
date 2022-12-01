import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

export const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confPassword: '',
	});

	const { name, email, password, confPassword } = formData;

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

		if (password !== confPassword) {
			toast.error('Passwords do not match');
		} else {
			const userData = {
				name,
				email,
				password,
			};

			dispatch(register(userData));
		}
	};

	if (isLoading) return <Spinner />;

	return (
		<div className='container'>
			<section className='heading'>
				<h1>Register Account</h1>
			</section>

			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='User Name'
							autoComplete='username'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='email'
							name='email'
							value={email}
							placeholder='email'
							autoComplete='email'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control register--password'
							id='password'
							name='password'
							value={password}
							autoComplete='new-password'
							placeholder='Password'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control register--confPassword'
							id='confPassword'
							name='confPassword'
							value={confPassword}
							autoComplete='new-password'
							placeholder='Password confirmation'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='registerBtn'>
							Register
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};
