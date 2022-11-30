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

// Does the currency conversion when called
function convert()
{
	// Get the elements needed from the document
	const resultElem = document.getElementById("result");
	const optionElem = document.getElementById("option");
	const amountElem = document.getElementById("amount");
	
	var fromCurrency = '';
	var toCurrency = '';
	
	if (resultElem && optionElem && amountElem)
	{
		if (optionElem.value && amountElem.value)
		{
			const amount = amountElem.value;
			if (optionElem.value == "Dollar to Yen")
			{
				fromCurrency = 'USD';
				toCurrency = 'JPY';
			}
			else
			{
				fromCurrency = 'JPY';
				toCurrency = 'USD';
			}
			// The rates are stored in cookie file (from index.js)
			if (Cookies.get("yen_to_dollar") && Cookies.get("dollar_to_yen"))
			{
				if (fromCurrency === 'JPY')
				{
					resultElem.innerHTML = `${amount} ${fromCurrency} = ${parseFloat(Cookies.get("yen_to_dollar") * amount).toFixed(2)} ${toCurrency}`;
				}
				else if(fromCurrency === 'USD')
				{
					resultElem.innerHTML = `${amount} ${fromCurrency} = ${parseFloat(Cookies.get("dollar_to_yen") * amount).toFixed(2)} ${toCurrency}`;
				}
			}
			// If the cookie value doesn't exist, let the user know that the rate couldn't be accessed.
			else
			{
				resultElem.innerHTML = "Conversion rate could not be accessed";
			}
		}
		else
		{
			console.log('Document elements\' values not found');
		}
	}
	else
	{
		console.log('Document elements not found');
	}
	
	
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
					<select id="option">
						<option value="Dollar to Yen">Dollars to Yen</option>
						<option value="Yen to Dollar">Yen to Dollars</option>
					</select>

					<label Text style={{ fontSize: 16 }}> Amount: </label>
					<input type="text" id="amount" />

					{ /* Create button that calls 'convert' when clicked */ }
					<button onClick={convert} type="button" >Convert</button>

					{ /* Used to display the resulting conversion or error message*/ }
					<p id="result"></p>
				</form>
			</body>
		</div>
	);
};



export default Converter;
