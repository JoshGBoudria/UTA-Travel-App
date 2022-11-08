/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 * Open source icon retrieved from https://tablericons.com/ 
 */


import React, { useCallback, useState, useRef } from "react";
import { useDropzone } from 'react-dropzone';
import Cookies from "js-cookie";
//import axios from 'axios';
import { initializeApp, /*applicationDefault, cert,*/ getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { arrayUnion, getFirestore, updateDoc, addDoc, getDocs, /*where,*/ collection, serverTimestamp, doc, onSnapshot, orderBy, query/*, QuerySnapshot*/ } from 'firebase/firestore';
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
//import { async } from '@firebase/util';
//import { useEffect } from "react";
//import Image from 'next/image';
//import { withCookies } from "react-cookie";

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

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);
const db = getFirestore();
const storage = getStorage();
var getImagesBool = true;

// Gets the encrypted codes from the Firestore database
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

const adminKey = parseInt(process.env.REACT_APP_ADMIN_ENCRYPTION_KEY, 10);
const regularKey = parseInt(process.env.REACT_APP_REGULAR_ENCRYPTION_KEY, 10);


const Dropbox = () =>
{
	const [selectedImages, setSelectedImages] = useState([]);
	const captionRef = useRef(null);
	const captionElem = document.getElementById('caption');
	var capVal = '';
	if (captionElem !== null)
	{
		if (typeof captionElem.value === 'string')
		{
			capVal = captionElem.value;
		}
	}
	
	const uploadPost = async () =>
	{
		// Add a new document into the 'posts' collection using a caption entered by the user
		//   and the current timestamp
		const docRef = await addDoc(collection(db, 'posts'),
		{
			caption: capVal,
			timestamp: serverTimestamp()
		});
		// For each image the user uploaded, add it to the FireBase storage and include the
		//   urls in the new 'posts' document
		await Promise.all(
			selectedImages.map(image =>
			{
				const imageRef = ref(storage, `posts/${image.path}`);
				// Upload the image to the Firebase storage
				uploadBytes(imageRef, image, 'data_url').then(async () =>
				{
					// Add the download URLs to the new 'posts' document
					const downloadURL = await getDownloadURL(imageRef);
					await updateDoc(doc(db, 'posts', docRef.id),
					{
						images: arrayUnion(downloadURL)
					});
				});
			})
		)
		// Reset the 'caption' element and SelectedImages to empty and the 'dropzone_text'
		//   element to its default value
		if (captionElem !== null)
		{
			if (typeof captionElem.value === 'string')
			{
				captionElem.value = '';
			}
		}
		setSelectedImages([]);
		if (document.getElementById('dropzone_text') !== null)
		{
			document.getElementById('dropzone_text').innerHTML = 'Tap, click, or drag and drop to upload images';
		}
		alert('Upload complete');
		// The image takes a while to upload (more than 20 seconds, I think)

		//setTimeout(function ()
		//{
			//window.location.reload();
		//}, 4000);
	}
	const onDrop = useCallback(acceptedFiles =>
	{
		// Let the user know how many files are pending for upload
		const numFilesPending = acceptedFiles.length;
		if (document.getElementById('dropzone_text') !== null)
		{
			document.getElementById('dropzone_text').innerHTML = numFilesPending + ' file(s) pending <br /> Tap submit to upload them';
		}
		setSelectedImages(acceptedFiles.map(file =>
			Object.assign(file,
			{
				preview: URL.createObjectURL(file)
			})
		));
	}, []);

	// When the user interacts with the Dropzone element
	const { getRootProps, getInputProps } = useDropzone(
	{
		// Only accept png and jpg image files
		accept:
		{
			'image/png': ['.png'],
			'text/jpg': ['.jpg']
		},
		// Function that handles what happens after
		onDrop
	});

	// Gets the images from the FireBase storage to display to the user
	async function getImages()
	{
		// Query to retrieve the images from the database
		const q = query(collection(db, "posts"), orderBy(`images`));
		const querySnapshot = await getDocs(q);
		var imagesElem = document.getElementById('images_display');

		// Display each image from the query
		querySnapshot.forEach((doc) =>
		{
			var div = document.createElement('div');
			div.innerHTML = doc.data().caption;
			var img = document.createElement('img');
			img.src = doc.data().images;
			if (imagesElem !== null)
			{
				imagesElem.appendChild(div);
				imagesElem.appendChild(img);
			}
		});
	}

	// Checks if the user entered the correct code
	async function check_code()
	{
		const adminCode = await getCodes(true);
		const regularCode = await getCodes(false);

		var fromCookieOnly = false;

		var codeElem = document.getElementById("code");
		var codeInput = document.getElementById("code").value;
		if (codeElem !== null)
		{
			codeInput = parseInt(codeElem.value, 10);
			if (typeof codeInput !== 'number')
			{
				fromCookieOnly = true;
				console.log('bad');
			}
		}
		
		// Element used to display error messages to the user
		var wrongCodeElem = document.getElementById("wrong_code");
		
		// If the code only needs to be checked from the cookie file, then you don't
		//   need to do this part
		if (!fromCookieOnly)
		{
			if (!navigator.onLine)
			{
				if (wrongCodeElem !== null)
				{
					// Let the user know that the code couldn't be verified
					wrongCodeElem.innerHTML = "Code can not be verified offline";
					setTimeout(function ()
					{
						if (wrongCodeElem !== null)
						{
							wrongCodeElem.innerHTML = '';
						}
					}, 2800);
				}
			}
			// If the user is online
			else
			{
				// If getCodes() returns non-numbers for both codes, then that means there 
				//   aren't any codes in the database (very bad if this occurs because the
				//   itinerary and dropbox will be inaccessible)
				if (typeof adminCode !== 'number' && typeof regularCode !== 'number')
				{
					if (wrongCodeElem !== null)
					{
						wrongCodeElem.innerHTML = 'Can\'t verify code (couldn\'t retrieve from database)';
						setTimeout(function ()
						{
							if (wrongCodeElem !== null)
							{
								wrongCodeElem.innerHTML = "";
							}
						}, 3000);
					}
				}
				else
				{
					//var codeElem = document.getElementById("code");
					if (typeof codeInput === 'number')
					{
						if (typeof adminKey === 'number' && typeof regularKey === 'number')
						{
							// Multiply whatever the user entered by the admin encryption key,
							//   and check if that value equals the admin code from the database
							//if (((codeInput * adminKey) + 3 > adminCode) && ((codeInput * adminKey) - 3 < adminCode))
							if ((codeInput * adminKey) === adminCode)
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
							//else if (((codeInput * regularKey) + 3 > regularCode) && ((codeInput * regularKey) - 3 < regularCode))
							else if ((codeInput * regularKey) === regularCode)
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
							// Otherwise, the user will see the text "Wrong code" for 2000 ms
							else
							{
								if (wrongCodeElem !== null)
								{
									wrongCodeElem.innerHTML = 'Wrong code';
									setTimeout(function ()
									{
										if (wrongCodeElem !== null)
										{
											wrongCodeElem.innerHTML = '';
										}
									}, 2000);
								}
							}
						}
						else
						{
							if (wrongCodeElem !== null)
							{
								wrongCodeElem.innerHTML = 'Code can\'t be verified (environment variable(s) missing)';
								setTimeout(function ()
								{
									if (wrongCodeElem !== null)
									{
										wrongCodeElem.innerHTML = '';
									}
								}, 2000);
							}
						}
					}
				}
			}
		}
		// (end of if (!fromCookieOnly))

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

	// Display admin view if the user has the correct value for the admin cookie
	if (sessionStorage.getItem('_userLevel') === '2')
	{
		if (getImagesBool === true)
		{
			getImagesBool = false;
			setTimeout(function ()
			{
				getImages();
			}, 1000);
		}
		return (
			<div>
				{/*The header for the Dropbox.*/}
				<h1> Dropbox </h1>
				{/* File upload */}
				<div>
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						{/* Display the upload icon */}
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
							<polyline points="7 9 12 4 17 9" />
							<line x1="12" y1="4" x2="12" y2="16" />
						</svg>
						<p id='dropzone_text'>Tap, click, or drag and drop to upload images</p>
					</div>
					<input ref={captionRef} type="text" placeholder='optional caption' />
					<button onClick={uploadPost}>Submit</button>
					{/* image(s) to be uploaded */}
				</div>
				<div>
					{/* Where the images and captions from the database are displayed */}
					<ul id='images_display' style={{ listStyleType: "none" }}></ul>
				</div>
			</div>
		);
	}
	// Display regular view if the user has the correct value for the regular cookie
	else if (sessionStorage.getItem('_userLevel') === '1')
	{
		if (getImagesBool === true)
		{
			getImagesBool = false;
			setTimeout(function ()
			{
				getImages();
			}, 1000);
		}
		return (
			<div>
				{/*The header for the Dropbox.*/}
				<h1> Dropbox </h1>
				{/* File upload */}
				<div>
					<div {...getRootProps()}>
						<input {...getInputProps()} />
						{/* Display the upload icon */}
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
							<polyline points="7 9 12 4 17 9" />
							<line x1="12" y1="4" x2="12" y2="16" />
						</svg>
						<p id='dropzone_text'>Tap, click, or drag and drop to upload images</p>
					</div>
					<input id='caption' type="text" placeholder='optional caption' />
					<button onClick={uploadPost}>Submit</button>
					{/* image(s) to be uploaded */}
				</div>
				<div>
					{/* Where the images and captions from the database are displayed */}
					<ul id='images_display' style={{ listStyleType: "none" }}></ul>
				</div>
			</div>
		);
	}
	// If the user isn't logged in at all, display the code insertion box and button
	else
	{
		return (
			<div>
				<p id="ip_address"></p>
				<label style={{ fontSize: 14 }}>
					Enter code provided by professor to access the dropbox:&nbsp;
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
		);
	}
};

export default Dropbox;
