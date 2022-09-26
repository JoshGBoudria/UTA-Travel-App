/* 
 * Shane Purdy 1001789955
 * 
 */

import React from "react";
import { useLinkClickHandler } from "react-router-dom";
import '../App.css';

function clickHandler() {
	const convert = document.getElementById("convert");
	const result = document.getElementById("result");
	const from = document.getElementById("from");
	const to = document.getElementById("to");
	const amount = document.getElementById("amount");

	let fromCurrency = from.value;
	let toCurrency = to.value;
	let amt = amount.value;
	result.innerHTML = `${from} + ${to}`;
	fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			let rate = data.rates[toCurrency];
			console.log(rate);
			let total = rate * amt;
			result.innerHTML = `${amt} ${fromCurrency} = ${total} ${toCurrency}`;
		});
}

const Converter = () => {
	return (
		<div class="App-Converter">
			<head>
				<link rel="shortcut icon" href="#" />
				<title>Currency Converter</title>
			</head>
			<body>
				<h1>Currency Converter</h1>
				<form>
					<label>From:</label>
					<select id="from">
						<option value="JPY">Japanese Yen</option>
						<option value="USD">US Dollars</option>
					</select>
					<label>To:</label>
					<select id="to">
						<option value="USD">US Dollars</option>
						<option value="JPY">Japanese Yen</option>
					</select>
					<label>Amount:</label>
					<input type="text" id="amount" />
					<button onClick={clickHandler} type="button" id="convert">Convert</button>
					<p id="result"></p>
				</form>
			  </body>
		</div>
    );
};


  
export default Converter;