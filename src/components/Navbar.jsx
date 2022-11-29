import React from 'react';
import { Link } from 'react-router-dom';

import reactLogo from '../assets/react.svg';

const Navbar = () => {
	return (
		<nav>
			<img src={reactLogo} className='nav--logo' alt='react logo' />
			<h2>Generator Of Passwords</h2>
			<ul className='nav--menu'>
				<li>
					<Link to='/'>Vault</Link>
				</li>
				<li>
					<Link to='./About'>About</Link>
				</li>
				<li>
					<Link to='Contact'>Contact</Link>
				</li>
			</ul>
			<span>
				<i className='fa-brands fa-sistrix fa-lg'></i>
			</span>
			<span>
				<i className='fa-solid fa-circle-user fa-lg'></i>
			</span>
		</nav>
	);
};

export default Navbar;
