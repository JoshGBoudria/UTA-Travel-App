/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866 
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Cookies from "js-cookie";

// Create the serviceWorker so that files can be downloaded to the user's device and accessed offline
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
		console.log("Service worker registered");
		console.log(registration);
	}).catch(error => {
		console.log("Service worker registration failed")
		console.log(error)
	});
}

// If the user is online
if (navigator.onLine)
{
	console.log('Getting rate');
	// Get the yen to dollar rate
	fetch(`https://api.exchangerate-api.com/v4/latest/JPY`)
	.then(response =>
	{
		// Returns json text containing the rate
		return response.json();
	})
	.then(data =>
	{
		// Store the rate locally as a cookie
		Cookies.set("yen_to_dollar", data.rates["USD"], {
			expires: 14,
			secure: true,
			path: "/",
		});
	});

	// Get the dollar to yen rate
	fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
	.then(response =>
	{
		// Returns json text containing the rate
		return response.json();
	})
	.then(data =>
	{
		// Store the rate locally as a cookie
		Cookies.set("dollar_to_yen", data.rates["JPY"], {
			expires: 14,
			secure: true,
			path: "/",
		});
	});
}

/*
const Index = () =>
{
	return (
		<>
			<head>
				<link rel="manifest" href="manifest.json" />
				<link rel="shortcut icon" href="#" />
				<meta charset="UTF-8" />
				<meta name="viewport" content="width = device-width, initial-scale = 1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie = edge" />
				<title> UTA Japan Trip PWA </title>
			</head>
			<div>
				<header className="App-header">
					<p> UTA Travel </p>
				</header>
			</div>
		</>
	);
};
*/

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

//export default Index;