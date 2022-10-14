/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 *
 */

import React from "react";
import Cookies from "js-cookie";

const Updates = () =>
{
	// Called when the update button is pressed (haven't implemented yet)
	const update_text = () =>
	{
		// TODO: code that handles when someone creates a new update
	}

	// Checks if the user entered the correct code
	const check_code = () =>
	{
		// If the user enters the correct code, set the cookie value 'code_cookie' to 'T'
		//   and reload the page
		if (document.getElementById("code").value === process.env.REACT_APP_LOGIN_CODE)
		{
			Cookies.set("code_cookie", process.env.REACT_APP_LOGIN_CODE,
			{
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
		// Render the updates
		return (
			<div>
				{/*Creates the header for the updates page.*/}
				<h1> Updates </h1>
				<p id="updates_text"></p>
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
					Enter code provided by professor to view the updates:&nbsp;
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

export default Updates;
