import React, { useState } from 'react';

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
				frameborder='0'
				style={{ border: 0 }}
				referrerpolicy='no-referrer-when-downgrade'
				src='https://www.google.com/maps/embed/v1/place?key=MY_API_KEY&q=SOME_ADDRESS'
				allowfullscreen
			></iframe>
			<form className='contact--form'>
				<input type='text' name='userName' id='userName' onChange={handleChange} />
				<input type='text' name='email' id='email' onChange={handleChange} />
				<textarea
					name='content'
					id='content'
					cols='30'
					rows='10'
					onChange={handleChange}
				></textarea>
				<button onClick={handleSubmit}>Send</button>
			</form>
		</>
	);
};
