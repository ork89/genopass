import React, { useState } from 'react';
import { useEffect } from 'react';
import './RangeSlider.css';

export const Slider = props => {
	const { minValue, maxValue, currentValue, name, disabled } = props;
	const [currentVal, setCurrentVal] = useState(currentValue);

	const handleChange = event => {
		setCurrentVal(prev => event.target.value);
		props.onValueChanged(event.target);
	};

	return (
		<div className='slider'>
			<input
				type='range'
				name={name}
				min={minValue}
				max={maxValue}
				value={currentVal}
				onChange={handleChange}
				disabled={!disabled}
			/>
			<p id='rangeValue'>{currentVal}</p>
		</div>
	);
};
