import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

import reactLogo from '../assets/react.svg';

const Navbar = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		navigate('/');
	};

	return (
		<nav>
			<img src={reactLogo} className='nav--logo' alt='react logo' />
			<h2 className='nav--heading'>Generator Of Passwords</h2>
			<ul className='nav--topLeft'>
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
			<ul className='nav--topRight'>
				{user ? (
					<li>
						<button className='nav--logoutBtn' onClick={onLogout}>
							<i className='fa-solid fa-door-open fa-lg'></i>
						</button>
					</li>
				) : (
					<>
						<li>
							<Link to='/login'>
								<i className='fa-solid fa-right-to-bracket fa-lg'></i>
							</Link>
						</li>
						<li>
							<Link to='/register'>
								<i className='fa-solid fa-circle-user fa-lg'></i>
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
