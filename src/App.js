import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
//import Index from './index.js';
import Home from './pages/home';
import Contacts from './pages/contacts';
import Converter from './pages/converter';
import Dropbox from './pages/dropbox';
import Itinerary from './pages/itinerary';
import Translation from './pages/translation';

function App()
{
	return (
		<div className="App">
			{/*Creates the navigation bar at the top of the page.*/}
			<Router>
				<Navbar />
				<Routes>
					{/* <Route exact path='/' element={<Index />} /> */}
					{/* <Route exact path='/home' element={<Home />} /> */}
					<Route exact path='/' element={<Home />} />
					<Route path='/contacts' element={<Contacts />} />
					<Route path='/converter' element={<Converter />} />
					<Route path='/dropbox' element={<Dropbox />} />
					<Route path='/itinerary' element={<Itinerary />} />
					<Route path='/translation' element={<Translation />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
