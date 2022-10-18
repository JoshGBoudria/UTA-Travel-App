/*
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * Josh Boudria 1001826768
 */

import React, { useState } from "react";
import Cookies from "js-cookie";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { ErrorResponse } from "@remix-run/router";

//Establishes calendar to base on US date and time 
const locales = {
	"en-US": require("date-fns/locale/en-US")
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
const events = [
]

//Function to display the calendar
function Calendarfxn() {

	const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
	const [allEvents, setAllEvents] = useState(events)

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
				<input type="text" placeholder="Add Title" style={{width: "20%", marginRight: "10px"}}
					value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
				/>
				<DatePicker placeholderText="Start Date" style={{marginRight: "10px"}}
				selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})}/>
				<DatePicker placeholderText="Start Date"
				selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})}/>
				<button style={{margintop: "10px"}} onClick={handleAddEvent}>Submit</button>
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
