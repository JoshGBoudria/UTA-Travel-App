import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route} 
    from 'react-router-dom';
import Home from './pages/home';
import Contacts from './pages/contacts';
import Converter from './pages/converter';
import Dropbox from './pages/dropbox';
import Itinerary from './pages/itinerary';
import Login from './pages/login';
import Translation from './pages/translation';
import Translator from './pages/translator';

function App() {
  return (
    <div className="App">
        <Router>
        <Navbar />
        <Routes>
            <Route exact path='/home' exact element={<Home/>} />
            <Route path='/contacts' element={<Contacts/>} />
            <Route path='/converter' element={<Converter/>} />
            <Route path='/dropbox' element={<Dropbox/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/itinerary' element={<Itinerary/>} />
            <Route path='/translation' element={<Translation/>} />
            <Route path='/translator' element={<Translator/>} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
