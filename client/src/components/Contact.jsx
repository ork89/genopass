import React, { useState } from 'react';
import envelope from '../assets/envelope.svg';

export const Contact = () => {
	const [userDetails, setUserDetails] = useState({
		userName: '',
		email: '',
		content: '',
	});

	const handleChange = event => {
		const { name, type, value } = event.target;

		setUserDetails(prevDetails => {
			return {
				...prevDetails,
				[name]: value,
			};
		});
	};

	const handleSubmit = event => {
		event.preventDefault();

		// Find a script that sends email via forms
		console.log({ userDetails });
	};

	return (
		<>
			<form className='contact--form'>
				<input
					type='text'
					placeholder='Your Name'
					name='userName'
					id='userName'
					onChange={handleChange}
				/>
				<input
					type='text'
					placeholder='Email Address'
					name='email'
					id='email'
					onChange={handleChange}
				/>
				<textarea
					name='content'
					id='content'
					cols='30'
					rows='10'
					placeholder='In case you have any questions or comments, we would love to hear them :)'
					onChange={handleChange}
				></textarea>
				<button onClick={handleSubmit} className='contact--submitBtn'>
					<img src={envelope} alt='send email envelope' />
				</button>
			</form>
		</>
	);
};
