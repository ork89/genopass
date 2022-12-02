import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePassword } from '../../features/vault/vaultSlice';
import './ContextMenu.css';

const ContextMenu = props => {
	const positions = {
		top: `${props.positionY}px`,
		left: `${props.positionX}px`,
	};

	const dispatch = useDispatch();

	return (
		<div className='context' style={positions}>
			<ul className='context-menu'>
				<li onClick={() => props.edit(props.id)}>Edit</li>
				<li onClick={() => dispatch(deletePassword(props.id))}>Delete</li>
				<li>Show Password</li>
			</ul>
		</div>
	);
};

export default ContextMenu;
