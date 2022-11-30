import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DataView from './components/DataView/DataView';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Contact } from './components/Contact';
import { About } from './components/About/About';

import './App.css';

function App() {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/' element={<DataView />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='about' element={<About />} />
				<Route path='contact' element={<Contact />} />
			</Routes>
		</div>
	);
}

export default App;
