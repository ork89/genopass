import React, { useState } from 'react';
import { useEffect } from 'react';
import ContextMenu from '../../ContextMenu/ContextMenu';

import './Data.css';

const Data = props => {
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [positions, setPositions] = useState({ x: 0, y: 0 });

	const { id, name, password } = props;

	useEffect(() => {
		document.addEventListener('click', handleOverlayClick);
		// document.addEventListener('contextmenu', openContextMenu);

		return () => {
			document.removeEventListener('click', handleOverlayClick);
			// document.removeEventListener('contextmenu', openContextMenu);
		};
	}, []);

	const handleOverlayClick = () => setShowContextMenu(false);

	const toggleShowPassword = () => {
		setPasswordVisibility(() => !passwordVisibility);
	};

	const openContextMenu = event => {
		event.preventDefault();
		setShowContextMenu(true);

		setPositions({
			x: event.pageX,
			y: event.pageY,
		});
	};

	return (
		<>
			{showContextMenu && (
				<ContextMenu
					id={id}
					edit={props.edit}
					show={toggleShowPassword}
					positionX={positions.x}
					positionY={positions.y}
				/>
			)}

			<div className='data--item' onContextMenu={e => openContextMenu(e)}>
				<form className='data--item-form'>
					<div>{name}</div>
					<div className='data--item-password'>
						<input
							type={passwordVisibility ? 'text' : 'password'}
							className='data--item-showPassword'
							name='showPassword'
							value={password}
							readOnly
						/>
					</div>
					<div className='data--item-buttons'>
						<span onClick={() => props.edit(props.id)}>
							<i className='fa-solid fa-pen fa-sm'></i>
						</span>
						<span onClick={toggleShowPassword}>
							{passwordVisibility ? (
								<i className='fa-solid fa-eye-slash fa-sm'></i>
							) : (
								<i className='fa-solid fa-eye fa-sm'></i>
							)}
						</span>
					</div>
				</form>
			</div>
		</>
	);
};

export default Data;
