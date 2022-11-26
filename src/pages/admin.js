/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 */

import React from "react";
import Cookies from "js-cookie";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, getDocs, collection, doc, setDoc, query } from 'firebase/firestore';

// Initialize Firebase
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

// Changes the student code to the one the admin entered
async function change_code()
{
	if (navigator.onLine)
	{
		// Make sure the element isn't null
		const newCodeElem = document.getElementById('new_code');
		if (newCodeElem)
		{
			if (newCodeElem.value)
			{
				// Code should be at least 8 characters long
				if (newCodeElem.value.length > 7)
				{
					const newCode = newCodeElem.value;
					// Make sure the value is a string
					if (typeof newCode === 'string')
					{
						// Update the code in Firebase
						const adminCode = await getCodes(true);
						const docRef = doc(db, 'codes', 'OpMY7PduveEwreBnDMhb');
						await setDoc(docRef, { admin: adminCode, regular: newCode });
						alert('Student code successfully changed. (May take up to 15 seconds to take effect.)');
					}
				}
				else
				{
					alert('Error: Code must be at least 8 characters long.');
				}
			}
			else
			{
				alert('Error: No code entered.')
			}
		}
	}
	else
	{
		alert('Error: Can\'t change code while offline');
	}
}


const Admin = () =>
{
	async function updateRegularCodeElem()
	{
		const regularCodeElem = document.getElementById('regular_code');
		if (regularCodeElem)
		{
			//if (regularCodeElem.innerHTML.substring(0, 21) !== 'Current student code:')
			//{
				if (navigator.onLine)
				{
					const studentCode = await getCodes(false);
					console.log(studentCode);

					if (regularCodeElem)
					{
						regularCodeElem.innerHTML = `Current student code: ${studentCode}`;
					}
				}
			//}
		}
	}

	if (sessionStorage.getItem('_userLevel') === '2')
	{
		return (
			<div>
				<div>
					<p id="regular_code"></p>
					<button onClick={updateRegularCodeElem} type="button">
						Show current student code
					</button>
				</div>
				
				<input id="new_code" />
				<button onClick={change_code} type="button">
					Submit
				</button>
				<label style={{ fontSize: 14 }}>
					Tap button to change student code.
				</label>
			</div>
		);
	}
	else
	{
		return (
			<div>
				<label style={{ fontSize: 14 }}>
					Enter admin code:&nbsp;
				</label>
				<input type="password" id="code" />
				<button onClick={check_code} type="button">
					Submit
				</button>
				<label style={{ fontSize: 14 }}>
					Tap button without entering anything if you already logged in using the admin code
				</label>
				<p id="wrong_code"></p>
			</div>
		);
	}
};

export default Admin;
