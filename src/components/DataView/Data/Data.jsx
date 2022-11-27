import React, { useState } from 'react';
import { useEffect } from 'react';
import ContextMenu from '../../ContextMenu/ContextMenu';

import './Data.css';

const Data = props => {
	const [showPass, setShowPass] = useState(false);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [positions, setPositions] = useState({ x: 0, y: 0 });

	useEffect(() => {
		document.addEventListener('click', handleOverlayClick);
		// document.addEventListener('contextmenu', openContextMenu);

		return () => {
			document.removeEventListener('click', handleOverlayClick);
			// document.removeEventListener('contextmenu', openContextMenu);
		};
	}, []);

	const handleOverlayClick = () => setShowContextMenu(false);

	const toggleShowPass = () => {
		setShowPass(() => !showPass);
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
					delete={props.remove}
					positionX={positions.x}
					positionY={positions.y}
					id={props.id}
				/>
			)}

			<div className='data--item' onContextMenu={e => openContextMenu(e)}>
				<span style={{ width: '100%', textIndent: '15px' }}>{props.name}</span>
				<span onClick={() => props.edit(props.id)}>
					<i className='fa-solid fa-pen fa-sm'></i>
				</span>
				<span onClick={toggleShowPass}>
					{showPass ? (
						<i className='fa-solid fa-eye fa-sm'></i>
					) : (
						<i className='fa-solid fa-eye-slash fa-sm'></i>
					)}
				</span>
			</div>
		</>
	);
};

export default Data;
