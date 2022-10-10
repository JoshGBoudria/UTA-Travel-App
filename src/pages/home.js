/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 */


import React from "react";
//import 'App.css';
/*import 'index.css';*/

/*if ("serviceWorker" in navigator)
{
	navigator.serviceWorker.register('serviceWorker.js').then(registration =>
	{
		console.log("Service worker registered");
		console.log(registration);
	}).catch(error =>
	{
		console.log("Service worker registration failed")
		console.log(error)
	});
}*/

const Home = () =>
{
	return (
		<>
			<head>
				<link rel="manifest" href="manifest.json" />
				<link rel="shortcut icon" href="#" />
				<meta charset="UTF-8" />
				<meta name="viewport" content="width = device-width, initial-scale = 1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie = edge" />
				{/*<script src="app.js"> </script>*/}
				<title> UTA Japan Trip PWA </title>
			</head>
			<div>
				{/*Creates the header for the Home page.*/}
				<header className="App-header">
					<p> UTA Travel </p>
				</header>
			</div>
		</>
	);
};

export default Home;
