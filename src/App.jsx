import { useState } from 'react';
import Navbar from './components/Navbar';
import DataView from './components/DataView/DataView';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<DataView />
		</div>
	);
}

export default App;
