import React, { useState } from 'react';

import './Data.css';

const Data = props => {
	const [showPass, setShowPass] = useState(false);

	const toggleShowPass = () => {
		setShowPass(() => !showPass);
	};

	return (
		<div className='data--item'>
			<span style={{ width: '100%', textIndent: '15px' }}>{props.name}</span>
			<span>
				<i onClick={() => props.remove(props.id)} className='fa-solid fa-trash fa-sm'></i>
			</span>
			<span>
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
	);
};

export default Data;
