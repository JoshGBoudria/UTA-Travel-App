/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 *
 * Partial code implementation from Imram Alam -
 * https://www.tutorialspoint.com/how-to-create-a-currency-converter-in-javascript
 * Including API usage for exchange rates - https://www.exchangerate-api.com/
 */

import React from "react";
import Cookies from "js-cookie";
//import '../App.css';

// Does the currency conversion when called
function convert()
{
	// Get the values needed from the document
	const result = document.getElementById("result");
	const from = document.getElementById("from");
	const to = document.getElementById("to");
	const amount = document.getElementById("amount").value;
	let fromCurrency = from.value;
	let toCurrency = to.value;

	// If the user is online, get the rate from the api to do the conversion.
	/*if (navigator.onLine)
	{
		// Get rates using the exchangerate api
		fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
			.then(response =>
			{
				// Returns json text containing the rate
				return response.json();
			})
			.then(data =>
			{
				// Gets the rate by calling '.rates' with the currency code ('JPY' or 'USD')
				let rate = data.rates[toCurrency];

				// Store the rate locally as a cookie
				Cookies.set("yen_to_dollar", rate, {
					expires: 14,
					secure: true,
					path: "/",
				});

				// Calculate and display the currency conversion
				const res = `${amount} ${fromCurrency} = ${parseFloat(rate * amount).toFixed(2)} ${toCurrency}`;
				result.innerHTML = res;
				
			});

	}
	// If the user is offline, get the rate from a cookie
	else
	{*/
	if (Cookies.get("yen_to_dollar") && Cookies.get("dollar_to_yen"))
	{
			if (fromCurrency === 'JPY')
			{
				result.innerHTML = `${amount} ${fromCurrency} = ${parseFloat(Cookies.get("yen_to_dollar") * amount).toFixed(2)} ${toCurrency}`;
			}
			else
			{
				result.innerHTML = `${amount} ${fromCurrency} = ${parseFloat(Cookies.get("dollar_to_yen") * amount).toFixed(2)} ${toCurrency}`;
			}
		}
		// If the cookie value doesn't exist or isn't a number, let the user know that the rate couldn't be accessed.
		else
		{
			document.getElementById("result").innerHTML = "Conversion rate could not be accessed";
		}
		
	//}
}

const Converter = () =>
{
	// UI display
	return (
		<div class="App-Converter">
			<head>
				<link rel="shortcut icon" href="#" />
				<title>Currency Converter</title>
			</head>
			<body>
				<h1>Currency Converter</h1>
				<form>

					{/* Create 2 drop-down boxes for the user to choose which currency is
					  * being converted to and which is being converted from */}
					<label Text style={{ fontSize: 16 }}> From: </label>
					<select id="from">
						<option value="JPY">Japanese Yen</option>
						<option value="USD">US Dollars</option>
					</select>
					<label Text style={{ fontSize: 16 }}> To: </label>
					<select id="to">
						<option value="USD">US Dollars</option>
						<option value="JPY">Japanese Yen</option>
					</select>

					<label Text style={{ fontSize: 16 }}> Amount: </label>
					<input type="text" id="amount" />

					{ /* Create button that calls 'convert' when clicked */}
					<button onClick={convert} type="button" >Convert</button>

					{ /* Used to display the resulting conversion or error message*/}
					<p id="result"></p>
				</form>
			</body>
		</div>
	);
};



export default Converter;
