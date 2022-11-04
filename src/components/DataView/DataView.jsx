import React from 'react';
import { useState } from 'react';
import testData from '../../testData';
import Data from './Data';

const DataView = () => {
	const [passwordList, setPasswordList] = useState(testData || []);
	const [filter, setFilter] = useState('');

	// for now removing the password from the in-memory passwords array
	const removePasswordItem = id => {
		setPasswordList(prevList => {
			let newPassArray = [];
			prevList.map(pass => {
				if (pass.id !== id) {
					console.log(`ID: ${id}\nPassId: ${pass.id}`);
					newPassArray.push(pass);
				}
			});

			return newPassArray;
		});
	};

	const passList = passwordList
		.filter(item => item.name.toLowerCase().includes(filter))
		.map(passwordItem => {
			return (
				<Data
					key={passwordItem.id}
					id={passwordItem.id}
					name={passwordItem.name}
					remove={removePasswordItem}
				/>
			);
		});

	return (
		<div>
			<div className='view--search'>
				<form>
					<input
						type='search'
						className='view--input'
						name='searchItem'
						id='searchItem'
						placeholder='Search...'
						onChange={e => setFilter(e.target.value)}
					/>
					<button type='submit'>Search</button>
				</form>
				<button>
					<i className='fa-solid fa-filter fa-lg'></i>
				</button>
				<button>
					<i className='fa-solid fa-square-plus fa-lg'></i>
				</button>
			</div>
			{passList}
		</div>
	);
};

export default DataView;
