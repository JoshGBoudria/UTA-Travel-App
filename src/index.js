import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the serviceWorker so that files can be downloaded to the user's device and used offline
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
		console.log("Service worker registered");
		console.log(registration);
	}).catch(error => {
		console.log("Service worker registration failed")
		console.log(error)
	});
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
