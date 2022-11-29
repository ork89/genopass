import Navbar from './components/Navbar';
import DataView from './components/DataView/DataView';
import { About } from './components/About/About';
import { Contact } from './components/Contact';

import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/' element={<DataView />} />
				<Route path='about' element={<About />} />
				<Route path='contact' element={<Contact />} />
			</Routes>
			{/* <DataView /> */}
		</div>
	);
}

export default App;
