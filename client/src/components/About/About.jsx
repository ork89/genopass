import React from 'react';
import { TestimonialCard } from './TestimonialCard';
import testimonials from './testimonials';
import './About.css';

export const About = () => {
	return (
		<div className='about'>
			<br />
			<h2>About GenOpass</h2>
			<hr />
			<br />
			<h3>Description:</h3>
			<p className='about--description'>
				<span>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat tempore
					explicabo ducimus adipisci alias magni eos voluptatibus consectetur! Vel eum
					repellat cum laboriosam pariatur provident aperiam recusandae odio nobis magni?
				</span>
				<span>
					Aliquam dolorum quam exercitationem, corrupti impedit eveniet voluptas facere,
					quisquam velit consectetur sint ipsam, libero nobis commodi ex iusto distinctio
					aperiam quis cupiditate veritatis!
				</span>
			</p>
			<br />
			<h3>Features:</h3>
			<ol className='about--features'>
				<li>
					Auto generates a strong and secure password based on your requirements and/or
					needs
				</li>
				<li>
					No need to remember every password you ever created just one! The master
					password for GenOpass and we will safeguard all of them for you
				</li>
				<li>Access all your passwords from anywhere in the world!</li>
			</ol>
			<br />
			<h3>Testimonials:</h3>
			<div className='about--testimonials'>
				{testimonials.map(t => {
					return <TestimonialCard key={t.id} name={t.name} content={t.content} />;
				})}
			</div>
		</div>
	);
};
