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
			<iframe
				width='100%'
				height='250'
				frameBorder='0'
				style={{ border: 0 }}
				referrerPolicy='no-referrer-when-downgrade'
				src='https://www.google.com/maps/embed/v1/place?key=AIzaSyA8uEaS8IFHeTatyYsYXqPW6YqokZqcGaI&q=Bareket+Petach+Tikva'
				allowFullScreen
			></iframe>
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
					onChange={handleChange}
				></textarea>
				<button onClick={handleSubmit} className='contact--submitBtn'>
					<img src={envelope} alt='send email envelope' />
				</button>
			</form>
		</>
	);
};
