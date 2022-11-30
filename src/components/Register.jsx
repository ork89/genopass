import { useState, useEffect } from 'react';

export const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confPassword: '',
	});

	const { name, email, password, confPassword } = formData;

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
				<h1>Register Account</h1>
			</section>

			<section className='form'>
				<form>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							placeholder='User Name'
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
						<input
							type='text'
							className='form-control'
							id='confPassword'
							name='confPassword'
							value={confPassword}
							placeholder='Password confirmation'
							onChange={onChange}
						/>
					</div>
					<div className='form-group'>
						<button className='registerBtn' onClick={handleSubmit}>
							Register
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};
