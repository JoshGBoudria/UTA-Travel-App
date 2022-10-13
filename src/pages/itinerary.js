/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 *
 */

import React from "react";
import Cookies from "js-cookie";
//import { ErrorResponse } from "@remix-run/router";

const Itinerary = () =>
{

	// Checks if the user entered the correct code
	const check_code = () =>
	{
		// If the user enters the correct code, set the cookie value 'code_cookie' to 'T'
		//   and reload the page
		if (document.getElementById("code").value === process.env.REACT_APP_LOGIN_CODE)
		{
			Cookies.set("code_cookie", process.env.REACT_APP_LOGIN_CODE, {
				expires: 14,
				secure: true,
				path: "/",
			});
			window.location.reload(false);
		}
		// Otherwise, the user will see the text "Wrong code" for 2000 ms
		else
		{
			document.getElementById("wrong_code").innerHTML = "Wrong code";
			setTimeout(function ()
			{
				document.getElementById("wrong_code").innerHTML = "";
			}, 2000);
		}
	};

	if (Cookies.get("code_cookie") === process.env.REACT_APP_LOGIN_CODE)
	{
		// Render the itinerary
		return (
			<div>
				{/*Creates the header for the itinerary and calendar.*/}
				<h1> Itinerary and Calendar </h1>
			</div>
		);
	}
	else
	{
		// Render the code insertion box and button
		return (
			<div>
				<p id="ip_address"></p>
				<label Text style={{ fontSize: 14 }}>
					Enter code provided by professor to see the itinerary:
				</label>
				<input type="password" id="code" />
				<button onClick={check_code} type="button">
					Submit
				</button>
				<p id="wrong_code"></p>
			</div>
		);
	}
};

export default Itinerary;
