import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactModal from 'react-modal';
import { Slider } from './slider/Slider';
import { CopyPassword } from '../../assets/icons';
import './PasswordGenerator.css';

ReactModal.setAppElement('#root');

export const PasswordGenerator = props => {
	const [isShowModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState({
		length: 8,
		useNumbers: { use: true, min: 2 },
		useUpperCase: { use: true, min: 2 },
		useLowerCase: { use: true, min: 2 },
		useSpecialChars: { use: true, min: 2 },
		passwordInput: '',
	});
	const [rules, setRules] = useState([
		{ chars: 'abcdefghijklmnopqrstuvwxyz', min: modalData.useLowerCase.min },
		{ chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', min: modalData.useUpperCase.min },
		{ chars: '0123456789', min: modalData.useNumbers.min },
		{ chars: '!@#$&*?|%+-_./:;=()[]{}', min: modalData.useSpecialChars.min },
	]);

	const [inputs, setInputs] = useState(4);
	const [maxChars, setMaxChars] = useState(Math.floor(modalData.length / inputs) || 4);

	useEffect(() => {
		let inputsUsed = 0;
		for (const index in modalData) {
			if (typeof modalData[index] === 'object' && modalData[index].use) inputsUsed++;
		}

		setInputs(() => inputsUsed);
		setMaxChars(() => Math.floor(modalData.length / inputs));
	}, [modalData.length]);

	const generatePassword = event => {
		event.preventDefault();

		var allChars = '',
			allMin = 0;

		rules.forEach(function (rule) {
			if (rule.min === 0) return;
			allChars += rule.chars;
			allMin += rule.min;
		});

		if (modalData.length < allMin) {
			setModalData(prevData => {
				return {
					...prevData,
					length: allMin,
				};
			});
		}

		setRules(current => [...current, { chars: allChars, min: modalData.length - allMin }]);

		var pswd = '';
		rules.forEach(function (rule) {
			if (rule.min > 0) {
				pswd += shuffleString(rule.chars, rule.min);
			}
		});

		console.warn(`Testing password: ${shuffleString(pswd)}\nPasswords length: ${pswd.length}`);

		setModalData(prevData => {
			return {
				...prevData,
				passwordInput: shuffleString(pswd, modalData.length),
			};
		});
	};

	const shuffleString = (str, maxlength) => {
		var shuffledString = str
			.split('')
			.sort(function () {
				return 0.5 - Math.random();
			})
			.join('');
		if (maxlength > 0) {
			shuffledString = shuffledString.substr(0, maxlength);
		}

		return shuffledString;
	};

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const handleChange = event => {
		const { name, value, type, checked } = event.target;

		setModalData(prevData => {
			const updatedValue =
				type === 'checkbox'
					? { use: checked, min: prevData[name].min }
					: { use: prevData[name].use, min: value };
			return {
				...prevData,
				[name]: updatedValue,
			};
		});
	};

	const handleSliderChange = target => {
		const { name, value } = target;

		if (name === 'passwordInput') {
			setModalData(prevData => {
				return {
					...prevData,
					length: value,
				};
			});

			return;
		}

		setModalData(prevData => {
			const updatedValue = { use: prevData[name].use, min: value };
			return {
				...prevData,
				[name]: updatedValue,
			};
		});
	};

	const handleCopy = () => {
		props.handleCopyPassword(modalData.passwordInput);
		closeModal();
	};

	return (
		<>
			<ReactModal
				isOpen={isShowModal}
				onRequestClose={closeModal}
				className='modal passGenerator'
				overlayClassName='overlay'
			>
				<form className='passGenerator'>
					<span>
						<input
							type='text'
							name='passwordInput'
							id='passwordInput'
							placeholder='Generated Password'
							onChange={handleChange}
							value={modalData.passwordInput}
						/>
						<button
							type='button'
							className='copyPassToClipboard'
							onClick={() => navigator.clipboard.writeText(modalData.passwordInput)}
						>
							<CopyPassword />
						</button>
					</span>
					<br />
					<span>
						<label htmlFor='pwdLengthSlider'>Password Length</label>
						<Slider
							name='passwordInput'
							maxValue='24'
							minValue='4'
							currentValue={modalData.length}
							onValueChanged={handleSliderChange}
							disabled='false'
						/>
					</span>
					<span>
						<span>
							<input
								type='checkbox'
								name='useNumbers'
								id='useNumbers'
								checked={modalData.useNumbers.use}
								onChange={handleChange}
							/>
							<label htmlFor='useNumbers'>0-9</label>
						</span>
						<Slider
							name='useNumbers'
							maxValue={maxChars}
							minValue='0'
							currentValue='2'
							onValueChanged={handleSliderChange}
							disabled={modalData.useNumbers.use}
						/>
					</span>
					<span>
						<span>
							<input
								type='checkbox'
								name='useUpperCase'
								id='useUpperCase'
								checked={modalData.useUpperCase.use}
								onChange={handleChange}
							/>
							<label htmlFor='useUpperCase'>A-Z</label>
						</span>
						<Slider
							name='useUpperCase'
							maxValue={maxChars}
							minValue='0'
							currentValue='2'
							onValueChanged={handleSliderChange}
							disabled={modalData.useUpperCase.use}
						/>
					</span>
					<span>
						<span>
							<input
								type='checkbox'
								name='useLowerCase'
								id='useLowerCase'
								checked={modalData.useLowerCase.use}
								onChange={handleChange}
							/>
							<label htmlFor='useLowerCase'>a-z</label>
						</span>
						<Slider
							name='useLowerCase'
							maxValue={maxChars}
							minValue='0'
							currentValue='2'
							onValueChanged={handleSliderChange}
							disabled={modalData.useLowerCase.use}
						/>
					</span>
					<span>
						<span>
							<input
								type='checkbox'
								name='useSpecialChars'
								id='useSpecialChars'
								checked={modalData.useSpecialChars.use}
								onChange={handleChange}
							/>
							<label htmlFor='useSpecialChars'>Special</label>
						</span>
						<Slider
							name='useSpecialChars'
							maxValue={maxChars}
							minValue='0'
							currentValue='2'
							onValueChanged={handleSliderChange}
							disabled={modalData.useSpecialChars.use}
						/>
					</span>
					<br />
					<span>
						<button type='button' onClick={generatePassword}>
							Generate
						</button>
						<button type='button' onClick={handleCopy}>
							Use
						</button>
					</span>
				</form>
			</ReactModal>
			<button type='button' onClick={openModal}>
				<i className='fa-solid fa-shield-halved fa-lg'></i>
			</button>
		</>
	);
};
