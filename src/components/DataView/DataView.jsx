import React, { useState, useEffect } from 'react';
import Data from './Data/Data';
import ReactModal from 'react-modal';
import { nanoid } from 'nanoid';
import { PasswordGenerator } from '../PasswordGenerator/PasswordGenerator';
import './DataView.css';

ReactModal.setAppElement('#root');

const DataView = () => {
	const [passwordList, setPasswordList] = useState(
		JSON.parse(localStorage.getItem('pwdList')) || []
	);
	const [filter, setFilter] = useState('');
	const [isShowModal, setShowModal] = useState(false);
	const [isInEditMode, setIsInEditMode] = useState(false);
	const [passwordItem, setPasswordItem] = useState({
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

	const editPasswordItem = id => {
		setIsInEditMode(true);

		const passwordFound = passwordList.filter(i => i.id === id);
		setPasswordItem(prevItem => passwordFound[0]);

		openModal();
	};

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setIsInEditMode(false);
		setShowModal(false);

		setPasswordItem({
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
		setPasswordItem(prevFormData => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value,
			};
		});
	};

	const handleCopyPassword = pwdString => {
		setPasswordItem(prevPass => {
			return {
				...prevPass,
				password: pwdString,
			};
		});
	};

	// Until the DB is up and running, the passwords list is saved in localStorage
	// useEffect is set to run 'localStorage.setItem()' on every change in 'PasswordList'
	const handleSubmit = e => {
		e.preventDefault();

		if (isInEditMode) {
			setPasswordList(prevList => {
				return prevList.map(item => {
					return item.id === passwordItem.id ? passwordItem : item;
				});
			});

			return;
		}

		setPasswordList(prevList => {
			const newList = [];
			newList.push(passwordItem);

			for (let index = 0; index < prevList.length; index++) {
				newList.push(prevList[index]);
			}

			return newList;
		});

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
							edit={editPasswordItem}
						/>
					);
				})
		) : (
			<h2>No Passwords Found</h2>
		);

	return (
		<div className='view--container' id='viewContainer'>
			<ReactModal
				isOpen={isShowModal}
				onRequestClose={closeModal}
				className='modal'
				overlayClassName='overlay'
			>
				<div className='modal--add-password'>
					{isInEditMode ? (
						<h3>Edit '{passwordItem.name}' Password</h3>
					) : (
						<h3>New Password</h3>
					)}
					<form>
						<input
							type='text'
							name='name'
							id='passwordName'
							placeholder='Name'
							onChange={handleChange}
							value={passwordItem.name}
						/>
						<input
							type='text'
							name='url'
							id='passwordUrl'
							placeholder='Url'
							onChange={handleChange}
							value={passwordItem.url}
						/>
						<input
							type='text'
							name='userName'
							id='userName'
							autoComplete='username'
							placeholder='User Name / Email'
							onChange={handleChange}
							value={passwordItem.userName}
						/>
						<span>
							<input
								type='password'
								name='password'
								id='password'
								autoComplete='new-password'
								placeholder='Password'
								onChange={handleChange}
								value={passwordItem.password}
							/>
							<PasswordGenerator handleCopyPassword={handleCopyPassword} />
						</span>

						<input
							type='text'
							name='category'
							id='passwordCategory'
							placeholder='Category'
							onChange={handleChange}
							value={passwordItem.category}
						/>
						<input
							type='text'
							name='comments'
							id='comments'
							placeholder='Comments'
							onChange={handleChange}
							value={passwordItem.comments}
						/>
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
				<button onClick={openModal}>
					<i className='fa-solid fa-square-plus fa-lg'></i>
				</button>
			</div>
			{passList}
		</div>
	);
};

export default DataView;
