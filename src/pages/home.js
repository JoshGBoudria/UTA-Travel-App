// @ts-check

/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 */

import React from "react";
//import 'App.css';
/*import 'index.css';*/

const Home = () =>
{
	return (
		<>
			<head>
				{/* Link the manifest.json file so that the PWA can be intalled */}
				<link rel="manifest" href="manifest.json" />
				<link rel="shortcut icon" href="#" />
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width = device-width, initial-scale = 1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie = edge" />
				{/*<script src="app.js"> </script>*/}
				<title> UTA Japan Trip PWA </title>
			</head>
			<div>
				{/*Creates the header for the Home page.*/}
				<header className="App-header">
				</header>
			</div>
		</>
	);
};

export default Home;
