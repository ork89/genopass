import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	createPassword,
	getPasswords,
	updatePassword,
	reset,
} from '../../features/vault/vaultSlice';
import Data from './Data/Data';
import Spinner from '../Spinner';
import ReactModal from 'react-modal';
import { nanoid } from 'nanoid';
import { PasswordGenerator } from '../PasswordGenerator/PasswordGenerator';
import './DataView.css';

ReactModal.setAppElement('#root');

const DataView = () => {
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

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.auth);
	const { vault, isLoading, isError, message } = useSelector(state => state.vault);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}

		if (!user) {
			navigate('/login');
		}

		dispatch(getPasswords());
	}, [user, navigate, isError, message, dispatch]);

	const editPasswordItem = id => {
		setIsInEditMode(true);

		const passwordFound = vault.filter(i => i._id === id);
		if (passwordFound) setPasswordItem(prevItem => passwordFound[0]);

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

	const handleSubmit = e => {
		e.preventDefault();

		if (isInEditMode) {
			dispatch(updatePassword(passwordItem));
		} else {
			dispatch(createPassword(passwordItem));
			dispatch(reset());
		}

		closeModal();
	};

	const passList =
		vault && vault.length > 0 ? (
			vault
				.filter(item => item.name.toLowerCase().includes(filter))
				.map(passwordItem => {
					return (
						<Data
							key={passwordItem._id}
							id={passwordItem._id}
							name={passwordItem.name}
							password={passwordItem.password}
							edit={editPasswordItem}
						/>
					);
				})
		) : (
			<h2>No Passwords Found</h2>
		);

	if (isLoading) return <Spinner />;

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
								id='userPassword'
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
					<i className='fa-solid fa-square-plus fa-xl'></i>
				</button>
			</div>
			{passList}
		</div>
	);
};

export default DataView;
