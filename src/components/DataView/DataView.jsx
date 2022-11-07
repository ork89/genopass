import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactModal from 'react-modal';
import testData from '../../testData';
import Data from './Data';

ReactModal.setAppElement('#root');

const DataView = () => {
	const [passwordList, setPasswordList] = useState(
		JSON.parse(localStorage.getItem('pwdList')) || []
	);
	const [filter, setFilter] = useState('');
	const [isShowModal, setShowModal] = useState(false);
	const [newPassword, setNewPassword] = useState({
		id: nanoid(),
		name: '',
		url: '',
		category: '',
		userName: '',
		password: '',
		comments: '',
	});

	useEffect(() => {
		localStorage.setItem('pwdList', JSON.stringify(passwordList));
	}, [passwordList]);

	// While there's still no DB only removing the password from memory and localStorage
	const removePasswordItem = id => {
		setPasswordList(prevList => {
			let newPassArray = [];
			prevList.map(pass => {
				if (pass.id !== id) {
					newPassArray.push(pass);
				}
			});

			return newPassArray;
		});
	};

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setNewPassword({
			id: nanoid(),
			name: '',
			url: '',
			category: '',
			userName: '',
			password: '',
			comments: '',
		});
	};

	const handleChange = event => {
		setNewPassword(prevFormData => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value,
			};
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		setPasswordList(prevList => {
			const newList = [];
			newList.push(newPassword);

			for (let index = 0; index < prevList.length; index++) {
				newList.push(prevList[index]);
			}

			return newList;
		});

		// after setting up the DB this will save the new password to that DB
		// for now I'll just use localStorage
		localStorage.setItem('pwdList', JSON.stringify(passwordList));
		closeModal();
	};

	const passList =
		passwordList && passwordList.length > 0 ? (
			passwordList
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
				})
		) : (
			<h2>No Passwords Found</h2>
		);

	return (
		<div id='view--container'>
			<ReactModal
				isOpen={isShowModal}
				onRequestClose={closeModal}
				className='modal'
				overlayClassName='overlay'
			>
				<div className='modal--add-password'>
					<form>
						<input
							type='text'
							name='name'
							id='passwordName'
							placeholder='Name'
							onChange={handleChange}
							value={newPassword.name}
						/>
						<input
							type='text'
							name='url'
							id='passwordUrl'
							placeholder='Url'
							onChange={handleChange}
							value={newPassword.passwordUrl}
						/>
						<input
							type='text'
							name='userName'
							id='userName'
							autoComplete='username'
							placeholder='User Name / Email'
							onChange={handleChange}
							value={newPassword.userName}
						/>
						<input
							type='password'
							name='password'
							id='password'
							autoComplete='new-password'
							placeholder='Password'
							onChange={handleChange}
							value={newPassword.password}
						/>
						<input
							type='text'
							name='category'
							id='passwordCategory'
							placeholder='Category'
							onChange={handleChange}
							value={newPassword.category}
						/>
						<input
							type='text'
							name='comments'
							id='comments'
							placeholder='Comments'
							onChange={handleChange}
							value={newPassword.comments}
						/>
						<hr />
						<br />
						<button onClick={handleSubmit} className='modal--submitBtn'>
							Save
						</button>
					</form>
				</div>
			</ReactModal>
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
				<button onClick={openModal}>
					<i className='fa-solid fa-square-plus fa-lg'></i>
				</button>
			</div>
			{passList}
		</div>
	);
};

export default DataView;
