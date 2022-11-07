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
import { initializeApp, applicationDefault, cert, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { arrayUnion, getFirestore, updateDoc, addDoc, getDocs, where, collection, serverTimestamp, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
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

const Dropbox = () =>
{
	// Contains the images uploaded by the user
	const [selectedImages, setSelectedImages] = useState([]);
	const captionRef = useRef(null);
	const uploadPost = async() =>
	{
		// Add a new document into the 'posts' collection using a caption entered by the user
		//   and the current timestamp
		const docRef = await addDoc(collection(db, 'posts'),
		{
			caption: captionRef.current.value,
			timestamp: serverTimestamp()
		});
		// For each image the user uploaded, add it to the FireBase storage and include the
		//   urls in the new 'posts' document
		await Promise.all(
			selectedImages.map(image =>
			{
				const imageRef = ref(storage, `posts/${image.path}`);
				uploadBytes(imageRef, image, 'data_url').then(async() =>
				{
					const downloadURL = await getDownloadURL(imageRef);
					await updateDoc(doc(db, 'posts', docRef.id),
					{
						images:arrayUnion(downloadURL)
					})
				})
			})
		)
		// Reset the captionRef and SelectedImages to empty
		captionRef.current.value = '';
		setSelectedImages([]);
	}
	const onDrop = useCallback(acceptedFiles =>
	{
		setSelectedImages(acceptedFiles.map(file =>
			Object.assign(file,
			{
				preview:URL.createObjectURL(file)
			})
		));
	}, []);
	const {getRootProps, getInputProps} = useDropzone({onDrop});

	// Gets the images from the FireBase storage to display to the user
	async function getImages()
	{
		// Query to retrieve the images from the database
		const q = query(collection(db, "posts"), orderBy(`images`));
		const querySnapshot = await getDocs(q);

		// Display each image from the query
		querySnapshot.forEach((doc) =>
		{
			var img = document.createElement('img');
			img.src = doc.data().images;
			document.getElementById('images_display').appendChild(img);
		});
	}

	// Checks if the user entered the correct code
	const check_code = () =>
	{
		// If the user is offline
		if (!navigator.onLine)
		{
			// Let the user know that the code couldn't be verified
			document.getElementById("wrong_code").innerHTML = "Code can not be verified offline";
			setTimeout(function ()
			{
				document.getElementById("wrong_code").innerHTML = '';
			}, 2800);
		}
		else
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
				// Refresh the page
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
		}
	};

	if (Cookies.get("code_cookie") === process.env.REACT_APP_LOGIN_CODE)
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
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-upload" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
						<polyline points="7 9 12 4 17 9" />
						<line x1="12" y1="4" x2="12" y2="16" />
					</svg>
						<p>Tap or drag and drop to upload image</p>
					</div>
					<input ref={captionRef} type="text" placeholder='Enter file name'/>
					<button onClick={uploadPost}>Submit</button>
					{/* image(s) to be uploaded */}
				</div>
				<div>
					{/* where all images on the database are displayed */}
					<div id='images_display'></div>
				</div>
			</div>
		);
	}
	else
	{
		// Render the code insertion box and button
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
				<p id="wrong_code"></p>
			</div>
		);
	}
};

export default Dropbox;
