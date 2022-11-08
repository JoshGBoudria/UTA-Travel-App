/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * Josh Boudria 1001826768
 */

import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDatabase, ref, child, push, update} from "firebase/database";
import { initializeApp, /*applicationDefault, cert,*/ getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { arrayUnion, getFirestore, updateDoc, addDoc, getDocs, where, collection, serverTimestamp, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { getDownloadURL, getStorage, uploadBytes} from 'firebase/storage';
//import { ErrorResponse } from "@remix-run/router";

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
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();
const dateRegExp = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}/;
async function createNewEvent(){
	if(dateRegExp.test(document.getElementById("Start").value) && dateRegExp.test(document.getElementById("End").value)){
		const eventRef = await addDoc(collection(db, 'Events'),{
			TITLE: document.getElementById("Title").value,
			START: document.getElementById("Start").value,
			END: document.getElementById("End").value,
			DESCRIP: document.getElementById("Descrip").value
		});
	}
	else{
		alert("Date format incorrect! Format: MM-DD-YYYY")
	}
}

// calculates the current date and creates buffer dates for month view
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
})

//List of events that is currently just a local array. Going to attach this to the database in iteration 3
const events = [];
//Function to display the calendar
function Calendarfxn() {

	const [newEvent, setNewEvent] = useState({title: "", start: "", end: "", description: ""});
	const [allEvents, setAllEvents] = useState(events);

	//Function that creates new event and adds it to the list of allEvents
	function handleAddEvent(){
		setAllEvents([...allEvents, newEvent])
	}

	//Formatting/UI of the calendar and add event functionalities
	return(
		<div className = "App">
			<h1>Calendar</h1>
			<h2>Add New Event</h2>
			<div>
				<input type="text" id="Title"  placeholder="Add Title" style={{width: "20%", marginRight: "10px"}}/>
				<input type="text" id="Descrip" placeholder="Add Description" style={{width: "20%", marginRight: "10px"}}/>
				<input type="text" id="Start" placeholder="Start Date (MM-DD-YYYY)" style={{width: "20%", marginRight: "10px"}}/>
				<input type="text" id="End" placeholder="End Date (MM-DD-YYYY)" style={{width: "20%", marginRight: "10px"}}/>
				<button style={{margintop: "10px"}} 
				onClick={createNewEvent}>Submit</button>
			</div>
			<Calendar 
				localizer={localizer} 
				events={allEvents} 
				startAccessor="start" 
				endAccessor="end" 
				style={{height: 1000, margin: "50px"}}/>
		</div>
	)
}

export default Calendarfxn;
