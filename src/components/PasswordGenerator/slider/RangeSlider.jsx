import React from 'react';
import './RangeSlider.css';

const RangeSlider = () => {
	let inputRange = document.querySelector('input');
	let maxValue = 100; // the higher the smoother when dragging
	let speed = 5;
	let currValue = 0;
	let rafID;

	// set min/max value
	inputRange.min = 0;
	inputRange.max = maxValue;

	const handleChange = () => {
		console.log(`Value = ${this}`);
	};

	// listen for unlock
	function unlockStartHandler() {
		// clear raf if trying again
		window.cancelAnimationFrame(rafID);

		// set to desired value
		currValue = +this.value;
		console.alert(`Value = ${currValue}`);
	}

	function unlockEndHandler() {
		// store current value
		currValue = +this.value;

		// determine if we have reached success or not
		if (currValue >= maxValue) {
			successHandler();
		} else {
			rafID = window.requestAnimationFrame(animateHandler);
		}
	}

	// handle range animation
	function animateHandler() {
		// calculate gradient transition
		var transX = currValue - maxValue;

		// update input range
		inputRange.value = currValue;

		//Change slide thumb color on mouse up
		if (currValue < 20) {
			inputRange.classList.remove('ltpurple');
		}
		if (currValue < 40) {
			inputRange.classList.remove('purple');
		}
		if (currValue < 60) {
			inputRange.classList.remove('pink');
		}

		// determine if we need to continue
		if (currValue > -1) {
			window.requestAnimationFrame(animateHandler);
		}

		// decrement value
		currValue = currValue - speed;
	}

	// handle successful unlock
	function successHandler() {
		alert('Unlocked');
	}

	// bind events
	inputRange.addEventListener('mousedown', unlockStartHandler, false);
	inputRange.addEventListener('mousestart', unlockStartHandler, false);
	inputRange.addEventListener('mouseup', unlockEndHandler, false);
	inputRange.addEventListener('touchend', unlockEndHandler, false);

	// move gradient
	inputRange.addEventListener('input', function () {
		//Change slide thumb color on way up
		if (this.value > 20) {
			inputRange.classList.add('ltpurple');
		}
		if (this.value > 40) {
			inputRange.classList.add('purple');
		}
		if (this.value > 60) {
			inputRange.classList.add('pink');
		}

		//Change slide thumb color on way down
		if (this.value < 20) {
			inputRange.classList.remove('ltpurple');
		}
		if (this.value < 40) {
			inputRange.classList.remove('purple');
		}
		if (this.value < 60) {
			inputRange.classList.remove('pink');
		}
	});
	return (
		<div>
			<input
				type='range'
				min='-100'
				max='0'
				value={currValue}
				onChange={handleChange}
				className='range blue'
			/>
		</div>
	);
};

export default RangeSlider;
