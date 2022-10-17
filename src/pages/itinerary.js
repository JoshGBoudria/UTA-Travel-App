/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 *
 */

import React from "react";
import Cookies from "js-cookie";
//import { ErrorResponse } from "@remix-run/router";


// Populates 'time_display' and 'event_display' elements with times and events for that day
function get_events(date)
{

	const time_display_elem = document.getElementById('time_display');
	const event_display_elem = document.getElementById('event_display');

	if (time_display_elem && event_display_elem)
	{
		// Remove previous times and events from the display
		while (time_display_elem.hasChildNodes())
		{
			time_display_elem.removeChild(time_display_elem.lastChild);
		}
		while (event_display_elem.hasChildNodes())
		{
			event_display_elem.removeChild(event_display_elem.lastChild);
		}

		// Get the day from the date passed in
		const day = date.getDate();

		// getMonth() gives number from 0-11, so you need to add 1
		const month = date.getMonth() + 1;

		var months = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"];

		document.getElementById('date_display').innerHTML = `${months[month - 1]} ${day}`;

		// Gets events from 6AM to 9PM
		for (var i = 6; i < 22; i += 1)
		{
			//var v = '';
			var v = process.env[`REACT_APP_${month}_${day}_${i}i`];

			var user_time = '';

			// Display the time in a more readable way while also converting it from
			//   24 hour time to AM/PM time
			if (i > 12)
			{
				user_time = `${(i - 12)}:00PM`;
			}
			else if (i === 12)
			{
				user_time = `12:00PM`;
			}
			else
			{
				user_time = `${i}:00AM`;
			}

			if (v === null || typeof v === 'undefined')
			{
				// Set v equal to a single space if there's no event for that time
				v = '&nbsp';
			}

			// Create the new document element and use it to display the time and event
			//   description for each hour than has an event to display
			const time_div = document.createElement('div');
			time_div.innerHTML = `${user_time}:`;
			time_display_elem.appendChild(time_div);

			const event_div = document.createElement('div');
			event_div.innerHTML = `${v}`;
			event_display_elem.appendChild(event_div);
			//}
		}
	}
}

// Modifies the current date by 'amount' then calls 'get_events()' with that date
function update_date(amount, date)
{
	date.setDate(date.getDate() + amount);
	get_events(date);
	return date;
}

const Itinerary = () =>
{
	window.onload = function ()
	{
		get_events(new Date());
	};

	// Checks if the user entered the correct code
	const check_code = () =>
	{
		// If the user enters the correct code, set the cookie value 'code_cookie' to the code
		//   value and reload the page
		if (document.getElementById('code').value === process.env.REACT_APP_LOGIN_CODE)
		{
			Cookies.set('code_cookie', process.env.REACT_APP_LOGIN_CODE,
				{
					expires: 14,
					secure: true,
					path: '/',
				});
			window.location.reload(false);
		}
		// Otherwise, the user will see the text "Wrong code" for 2000 ms
		else
		{
			document.getElementById("wrong_code").innerHTML = 'Wrong code';
			setTimeout(function ()
			{
				document.getElementById("wrong_code").innerHTML = '';
			}, 2000);
		}
	};

	// If the code in the cookie file is correct, display the itinerary
	if (Cookies.get("code_cookie") === process.env.REACT_APP_LOGIN_CODE)
	{
		// Keeps track on the date of the current events displayed
		var current_date = new Date();

		// If the date isn't displaying, 'get_events()' needs to be called, but
		//   wait 100 ms before doing it because the elements need to load first
		if (!document.getElementById('date_display'))
		{

			setTimeout(function ()
			{
				get_events(new Date());
			}, 100);
		}
		else if (document.getElementById('date_display').innerHTML === 'Date')
		{
			setTimeout(function ()
			{
				get_events(new Date());
			}, 100);
			
		}

		return (
			<div>
				{/*Creates the header for the itinerary and calendar.*/}
				<h1> Itinerary and Calendar </h1>

				<h2 id='date_display'>Date</h2>

				<script type="text/javascript">
					current_date = update_date(0);
				</script>

				{/* When clicked, sets the date back by 1 and updates the events on screen */}
				<button type="button" onClick={() =>
				{
					current_date = update_date(-1, current_date);
				}}
				>

					{/* Display the '<' symbol on the button */}
					&lt;
				</button>

				{/* When clicked, sets the date forward by 1 and updates the events on screen */}
				<button type="button" onClick={() =>
				{
					current_date = update_date(1, current_date);
				}}
				>

					{/* Display the '>' symbol on the button */}
					&gt;
				</button>

				{/* TODO: change style so that 'time_display' shows up on the left
					  and 'event_display shows up on the right'  */}
				<ul style={{ 'list-style': 'none', 'display': 'inline-block' }}>
					<li>
						{/* Used to display the times for each day */}
						<p id='time_display' style=
							{{
								'text-align': 'left', 'margin-left': '-500px'
							}}></p>
					</li>
					<li>
						{/* Used to display the events for each day */}
						<p id='event_display' style=
							{{
								'text-align': 'right', 'margin-right': '100px'
							}}></p>
					</li>
				</ul>
			</div>
		);
	}

	// If the code in the cookie file isn't correct or doesn't exist, display the
	//   code insertion box and button
	else
	{
		return (
			<div>
				<p id="ip_address"></p>
				<label Text style={{ fontSize: 14 }}>
					Enter code provided by professor to view the itinerary and calendar:&nbsp;
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
