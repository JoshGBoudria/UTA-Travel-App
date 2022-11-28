/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
*/


import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Dropdown from './Components/Dropdown';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { BrowserRouter as Router, Routes, Switch, Route }
	from 'react-router-dom';
import Home from './pages/home';
import Contacts from './pages/contacts';
import Converter from './pages/converter';
import Dropbox from './pages/dropbox';
import Itinerary from './pages/itinerary';
import Translation from './pages/translation';
import {BrowserView, MobileView} from 'react-device-detect';
import Admin from './pages/admin';

function App()
{
    const [isOpen, setIsOpen] = useState(false);
    
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="App">
                <Router>
                    {/*Creates the navigation bar at the top of the page and the dropdown menu.*/}
                    <Dropdown isOpen={isOpen} toggle={toggle} />
                    <Navbar toggle={toggle} />
                    <Routes>
                        {/*Routes to the other pages of the app.*/}
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
