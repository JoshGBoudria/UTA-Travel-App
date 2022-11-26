/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
*/

import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './pages/home';
import Contacts from './pages/contacts';
import Converter from './pages/converter';
import Dropbox from './pages/dropbox';
import Itinerary from './pages/itinerary';
import Translation from './pages/translation';
import Admin from './pages/admin';

function App()
{
	return (
		<div className="App">
			{/*Creates the navigation bar at the top of the page.*/}
			<Router>
				<Navbar />
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='/itinerary' element={<Itinerary />} />
					<Route path='/converter' element={<Converter />} />
					<Route path='/translation' element={<Translation />} />
					<Route path='/dropbox' element={<Dropbox />} />
					<Route path='/contacts' element={<Contacts />} />
					<Route path='/admin' element={<Admin />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
