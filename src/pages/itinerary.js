/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * Josh Boudria 1001826768
 */

import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { initializeApp, getApps, getApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { /*arrayUnion,*/ getFirestore, /*updateDoc,*/ addDoc, getDocs, collection, /*serverTimestamp,*/ doc, deleteDoc, /*orderBy,*/ query, /*enableIndexedDbPersistence, getDoc,*/ where } from 'firebase/firestore';

//Establishes calendar to base on US date and time 
const locales = {
	"en-US": require("date-fns/locale/en-US")
}

const firebaseConfig =
{
	apiKey: "AIzaSyDWkmItJirMLZ9MotrBuJ_GthRl24cMxO4",
	authDomain: "uta-travel-abroad.firebaseapp.com",
	databaseURL: "https://uta-travel-abroad-default-rtdb.firebaseio.com",
	projectId: "uta-travel-abroad",
	storageBucket: "uta-travel-abroad.appspot.com",
	messagingSenderId: "1097972700841",
	appId: "1:1097972700841:web:bc6d8ab59aff357dc53bb8",
	measurementId: "G-SGP45GK6DJ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

// Used for verifying the date and time formats
const dateRegExp = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}/;
const timeRegExp = /^[0-2][0-9]\:[0-9]{2}/;

// calculates the current date and creates buffer dates for month view
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
})

// Gets the codes from the Firestore database
//   If adminB is true, return the admin code; otherwise, return
//   the regular code
async function getCodes(adminB)
{
	// Query to retrieve the codes from the database
	const q = query(collection(db, "codes"));
	const querySnapshot = await getDocs(q);
	var retval = null;
	querySnapshot.forEach((doc) =>
	{
		if (adminB)
		{
			retval = doc.data().admin;
		}
		else
		{
			retval = doc.data().regular;
		}
	});
	return retval;
}

// Checks if the user entered the correct code
async function check_code()
{
	var wrongCodeElem = document.getElementById("wrong_code");

	if (navigator.onLine)
	{
		if (wrongCodeElem !== null)
		{
			wrongCodeElem.innerHTML = 'Checking code...';
		}
		const adminCode = await getCodes(true);
		const regularCode = await getCodes(false);

		var fromCookieOnly = false;

		var codeElem = document.getElementById("code");
		var codeInput = document.getElementById("code").value;
		if (codeElem !== null)
		{
			if (typeof codeInput !== 'string')
			{
				fromCookieOnly = true;
			}
		}

		// If the code only needs to be checked from the cookie file, then you don't
		//   need to do this part
		if (!fromCookieOnly)
		{
			// If getCodes() returns non-strings for both codes, then that means there 
			//   aren't any codes in the database (very bad if this occurs because the
			//   itinerary and dropbox will be inaccessible)
			if (typeof adminCode !== 'string' && typeof regularCode !== 'string')  // changed from number to string
			{
				if (wrongCodeElem !== null)
				{
					wrongCodeElem.innerHTML = 'Can\'t verify code (couldn\'t retrieve from database)';
					/*setTimeout(function ()
					{
						if (wrongCodeElem !== null)
						{
							wrongCodeElem.innerHTML = "";
						}
					}, 3000);*/
				}
			}
			else
			{
				if (codeInput === adminCode)
				{
					// If they entered the correct admin code, set the cookie so that
					//   they remain logged in
					Cookies.set("admin", adminCode,
						{
							expires: 100,
							secure: true,
							path: "/",
						});
				}
				else if (codeInput === regularCode)
				{
					// If they entered the correct regular code, set the cookie so that
					//   they remain logged in
					Cookies.set("regular", regularCode,
						{
							expires: 100,
							secure: true,
							path: "/",
						});
				}
				// Otherwise, the user will see the text 'Wrong code' if they aren't logged in
				else
				{
					if (!((sessionStorage.getItem('_userLevel') === '2') || (sessionStorage.getItem('_userLevel') === '1')))
					{
						if (wrongCodeElem !== null)
						{
							wrongCodeElem.innerHTML = 'Wrong code';
							/*setTimeout(function ()
							{
								if (wrongCodeElem !== null)
								{
									wrongCodeElem.innerHTML = '';
								}
							}, 2000);*/
						}
					}

				}
			}
		}  // (end of if (!fromCookieOnly))

		// Check the code from the cookie file, and set the userLevel accordingly
		if (Cookies.get('admin') == adminCode)
		{
			// sessionStorage variables persist even after the page is refreshed
			sessionStorage.setItem('_userLevel', '2');
			// Refresh the page
			window.location.reload();
		}
		else if (Cookies.get('regular') == regularCode)
		{
			sessionStorage.setItem('_userLevel', '1');
			// Refresh the page
			window.location.reload();
		}
		else
		{
			sessionStorage.setItem('_userLevel', '0');
			// Refresh the page
			window.location.reload();
		}
	}
	else
	{
		if (wrongCodeElem !== null)
		{
			// Let the user know that the code couldn't be verified
			wrongCodeElem.innerHTML = "Code can\'t be verified offline";
			/*setTimeout(function ()
			{
				if (wrongCodeElem !== null)
				{
					wrongCodeElem.innerHTML = '';
				}
			}, 2800);*/
		}
	}
}

// Called when admin clicks the submit button for a new event after entering the title, start date,
//   end date, start time, and end time
async function createNewEvent()
{
	const titleElem = document.getElementById("Title");
	const startElem = document.getElementById("Start");
	const endElem = document.getElementById("End");
	const startTimeElem = document.getElementById("StartTime");
	const endTimeElem = document.getElementById("EndTime");
	
	// Check to make sure the elements have rendered
	if (startElem && endElem && startTimeElem && endTimeElem && titleElem)
	{
		// Make sure the values from those elements exists
		if (startElem.value && endElem.value && startTimeElem.value && endTimeElem.value && titleElem.value)
		{
			// The title doesn't need to be checked
			const titleForm = titleElem.value;
			// Check the dates using the date regular expression
			if (dateRegExp.test(startElem.value) && dateRegExp.test(endElem.value))
			{
				// Check the times using the time regular expression
				if (timeRegExp.test(startTimeElem.value) && timeRegExp.test(endTimeElem.value))
				{
					// The start is set to the start date with a 'T' and the start time appended
					const startForm = `${startElem.value}T${startTimeElem.value}:00`;
					// The end is set to the end date with a 'T' and the end time appended
					const endForm = `${endElem.value}T${endTimeElem.value}:00`;
					// Create and upload the event to the database
					const eventRef = await addDoc(collection(db, 'Events'), {
						TITLE: titleForm,
						START: startForm,
						END: endForm
					});
					alert('Event created');
				}
				else
				{
					alert("Incorrect time format (should be HH:MM)")
				}
			}
			else
			{
				alert("Incorrect date format (should be YYYY-MM-DD)")
			}
		}
	}
}

// Called when admin clicks submit button for deleting an event after they entered the title of the
//   event they want to delete
async function deleteEvent()
{
	const deleteTitleElem = document.getElementById('DeleteTitle');
	// boolean that lets us know if anything was deleted
	var successBool = false;
	if (deleteTitleElem)
	{
		if (deleteTitleElem.value)
		{
			const titleToDelete = deleteTitleElem.value;
			
			const eventsRef = collection(db, 'Events');
			
			// Get all documents where the title is equal to the title the admin entered
			var q = query(eventsRef, where('TITLE', '==', titleToDelete));
			const querySnapshot = await getDocs(q);
			// Delete each document found with the matching title
			querySnapshot.forEach((d) =>
			{
				const ref = doc(db, "Events", d.id);
				deleteDoc(ref);
				// A delete was made, so set successBool to true
				successBool = true;
			});
		}
	}
	if (successBool)
	{
		alert('Delete successful');
	}
	else
	{
		alert('Event not found');
	}
}

//Function to display the calendar
function Calendarfxn()
{
	const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
	const [allEvents, setAllEvents] = useState([]);
	
	const [selectedEvent, setSelectedEvent] = useState(undefined);
	
	// The calendar is displayed based on the user's device width
	const [width, setWidth] = useState(window.innerWidth);
	
	function widthChange()
	{
		setWidth(window.innerWidth);
	}

	// When the user's device width changes, call widthChange() to update its value
	useEffect(() =>
	{
		window.addEventListener('resize', widthChange);
		return () =>
		{
			window.removeEventListener('resize', widthChange);
		}
	}, []);
	
	const handleSelectedEvent = (event) =>
	{
		setSelectedEvent(event)
	}
	
	// When user selects, an event, display that event's title to them
	useEffect(() =>
	{
		if (selectedEvent)
		{
			if (selectedEvent.title)
			{
				alert(selectedEvent.title);
				setSelectedEvent(undefined);
			}
		}
	}, [selectedEvent]);
	
	// The events will be fetched from the database when the page loads
	useEffect(() =>
	{
		fetchEvents();
	}, [])
	window.addEventListener('load', fetchEvents);
	
	// Gets the events from the database
	async function fetchEvents()
	{
		var eventsTemp = [];
		await getDocs(collection(db, "Events")).then((QuerySnapshot) =>
		{
			QuerySnapshot.forEach(DocumentSnapshot =>
			{
				// Time formatting (24 hour time to AM/PM)
				var startTime = DocumentSnapshot.get("START").substring(11, 16);
				if (startTime.substring(0, 1) === '0')
				{
					if (startTime.substring(0, 2) === '00')
					{
						startTime = '12' + startTime.substring(2, 16) + 'AM';
					}
					else
					{
						startTime = startTime.substring(1, 5) + 'AM';
					}
				}
				else if (parseInt(startTime.substring(0, 2)) >= 13)
				{
					const a = parseInt(startTime.substring(0, 2)) - 12;
					const b = a.toString();
					startTime = b + startTime.substring(2, 5) + 'PM';
				}
				else
				{
					startTime = startTime + 'AM';
				}
				// Get the event title, start date, and end date
				const eventObj = {
					// The title will also show the start time
					title: DocumentSnapshot.get("TITLE") + ' (' + startTime + ')',
					start: new Date(DocumentSnapshot.get("START")),
					end: new Date(DocumentSnapshot.get("END"))
				}
				eventsTemp = [...eventsTemp, eventObj];
			});
			setAllEvents(eventsTemp);
		});
	}

	// Admin view
	if (sessionStorage.getItem('_userLevel') === '2')
	{
		return (
			<div className="App">
				<h1>Calendar</h1>
				<h2>Add New Event</h2>
				<div>
					{/* Required text input for creating a new event */}
					<input type="text" id="Title" placeholder="Add Title" style={{ width: "40%", marginRight: "10px" }} />
					<br></br>
					<input type="text" id="Start" placeholder="Start Date (YYYY-MM-DD)" style={{ width: "40%", marginRight: "10px" }} />
					<br></br>
					<input type="text" id="End" placeholder="End Date (YYYY-MM-DD)" style={{ width: "40%", marginRight: "10px" }} />
					<br></br>
					<input type="text" id="StartTime" placeholder="Start Time (HH:MM)" style={{ width: "40%", marginRight: "10px" }} />
					<br></br>
					<input type="text" id="EndTime" placeholder="End Time (HH:MM)" style={{ width: "40%", marginRight: "10px" }} />
					<br></br>
					<button style={{ margintop: "10px" }}
						onClick={createNewEvent}>Submit</button>
				</div>
				<br></br>
				<h2>Delete Event</h2>
				<div>
					{/* Required text input for deleting an event */}
					<input type="text" id="DeleteTitle" placeholder="Title of event to delete" style={{ width: "40%", marginRight: "10px" }} />
					<button style={{ margintop: "10px" }}
						onClick={deleteEvent}>Submit</button>
				</div>
				<br></br>
				<center>
					{/* Show the calendar */}
					<Calendar
						selectable
						localizer={localizer}
						events={allEvents}
						startAccessor="start"
						endAccessor="end"
						style={{ height: 1000, width: (width * 0.9), margin: "10px" }}
						onSelectEvent={(e) => handleSelectedEvent(e)}
					/>
				</center>
			</div>
		)
	}
	// Student view
	else if (sessionStorage.getItem('_userLevel') === '1')
	{
		return (
			<div className="App">
				<h1>Calendar</h1>
				<label style={{ fontSize: 14 }}>
					Enter admin code to add and delete events:&nbsp;
				</label>
				<input type="password" id="code" />
				<button onClick={check_code} type="button">
					Submit
				</button>
				<p id="wrong_code"></p>
				<br></br>
				<center>
					<Calendar
						selectable
						localizer={localizer}
						events={allEvents}
						startAccessor="start"
						endAccessor="end"
						style={{ height: 1000, width: (width * 0.9), margin: "10px" }}
						onSelectEvent={(e) => handleSelectedEvent(e)}
					/>
				</center>
			</div>
		)
	}
	// Other user view (not loggin in)
	else
	{
		return (
			<div>
				<label style={{ fontSize: 14 }}>
					Enter code provided by professor to access the itinerary and calendar:&nbsp;
				</label>
				<input type="password" id="code" />
				<button onClick={check_code} type="button">
					Submit
				</button>
				<label style={{ fontSize: 14 }}>
					Tap button without entering anything if you already logged in
				</label>
				<p id="wrong_code"></p>
			</div>
		)
	}
}

export default Calendarfxn;
