import React, { useState, useEffect } from 'react';

export const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

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
	};

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
							type='text'
							className='form-control'
							id='password'
							name='password'
							value={password}
							placeholder='Password'
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
