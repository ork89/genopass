import React from 'react';
import './ContextMenu.css';

const ContextMenu = props => {
	const positions = {
		top: `${props.positionY}px`,
		left: `${props.positionX}px`,
	};

	return (
		<div className='context' style={positions}>
			<ul className='context-menu'>
				<li>Edit</li>
				<li onClick={() => props.delete(props.id)}>Delete</li>
				<li>Show Password</li>
			</ul>
		</div>
	);
};

export default ContextMenu;
