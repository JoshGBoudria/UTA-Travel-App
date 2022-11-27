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
import { initializeApp, getApps, getApp } from "firebase/app";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { arrayUnion, getFirestore, updateDoc, addDoc, getDocs, where, collection, serverTimestamp, doc, onSnapshot, orderBy, query, QuerySnapshot, DocumentSnapshot } from 'firebase/firestore';

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



const dateRegExp = /^[0-9]{2}\-[0-9]{2}\-[0-9]{4}/;
const timeRegExp = /^[0-1][0-9]\:[0-9]{2}/;
async function createNewEvent(){
	if(dateRegExp.test(document.getElementById("Start").value) && dateRegExp.test(document.getElementById("End").value)){
		if(timeRegExp.test(document.getElementById("Time").value)){
			const startForm = dateFormat(document.getElementById("Start").value, document.getElementById("Time").value);
			const endForm = dateFormat(document.getElementById("End").value, document.getElementById("Time").value);
			const eventRef = await addDoc(collection(db, 'Events'),{
				TITLE: document.getElementById("Title").value,
				START: startForm,
				END: endForm
			});
		}
		else{
			alert("Time format incorrect! Format: HH:MM")
		}
	}
	else{
		alert("Date format incorrect! Format: MM-DD-YYYY")
	}
}

function dateFormat(dateString, timeString) {
	const sepDate = dateString.split("-");
	const finalString = sepDate[2] + "-" + sepDate[0] + "-" + sepDate[1] + "T" + timeString + ":00";
	return finalString;
}

// calculates the current date and creates buffer dates for month view
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales
})

//Function to display the calendar
function Calendarfxn() {
	const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""});
	const [allEvents, setAllEvents] = useState([]);

	// const fetchEvents = async () => {
	// 	await getDocs(collection(db, "Events")).then((QuerySnapshot) => {
	// 		const newData = QuerySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id }));
	// 		setNewEvent({title: });
			
	// 	})
	// }

	const fetchEvents = async () => {
		var eventsTemp = [];
		await getDocs(collection(db, "Events")).then((QuerySnapshot) => {
			QuerySnapshot.forEach(DocumentSnapshot => {
				const eventObj = {
					title: DocumentSnapshot.get("TITLE"),
					start: new Date(DocumentSnapshot.get("START")),
					end: new Date(DocumentSnapshot.get("END"))
				}
				eventsTemp = [...eventsTemp, eventObj];
			});
			setAllEvents(eventsTemp);
		});
	}
	
	useEffect(()=>{
		fetchEvents();
	}, [])
	
	window.addEventListener('load', fetchEvents);

	//Formatting/UI of the calendar and add event functionalities
	return(
		<div className = "App">
			<h1>Calendar</h1>
			<h2>Add New Event</h2>
			<div>
				<input type="text" id="Title"  placeholder="Add Title" style={{width: "20%", marginRight: "10px"}}/>
				<input type="text" id="Start" placeholder="Start Date (MM-DD-YYYY)" style={{width: "20%", marginRight: "10px"}}/>
				<input type="text" id="End" placeholder="End Date (MM-DD-YYYY)" style={{width: "20%", marginRight: "10px"}}/>
				<input type="text" id="Time" placeholder="Time HH:MM" style={{width: "20%", marginRight: "10px"}}/>
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
