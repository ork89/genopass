import React from 'react';
import './TestimonialCard.css';

export const TestimonialCard = ({ name, content }) => {
	return (
		<div className='card--container'>
			<h3 className='card--name'>{name}</h3>
			<p className='card--content'>{content}</p>
		</div>
	);
};
