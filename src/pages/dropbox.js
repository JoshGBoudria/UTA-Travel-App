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
import { arrayUnion, getFirestore, updateDoc, addDoc, getDocs, /*where,*/ collection, serverTimestamp, doc, deleteDoc, onSnapshot, orderBy, query/*, QuerySnapshot*/ } from 'firebase/firestore';
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

//var fileURLs = [];

/*
async function deleteFile(postTimestamp)
{
	await deleteDoc(doc(db, "cities", "DC"));

	// Create a reference to the file to delete
	var fileRef = storage.refFromURL(url);
  
	console.log("File in database before delete exists : " 
		+ fileRef.exists());
  
	// Delete the file using the delete() method 
	fileRef.delete().then(function ()
	{
		// File deleted successfully
		console.log("File Deleted")
	}).catch(function (error)
	{
		console.log(error);
	});
	console.log("File in database after delete exists : "
		+ fileRef.exists());
}
*/



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

// remove these lines for final deliverable
/*if (typeof adminKey !== 'number')
{
	adminKey = 80186011;
}
if (typeof regularKey !== 'number')
{
	regularKey = 39436201;
}*/


const Dropbox = () =>
{
	const [selectedImages, setSelectedImages] = useState([]);

	/* (copied these lines to the uploadPost block)
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
	*/

	const uploadPost = async () =>
	{
		const captionElem = document.getElementById('caption');
		var capVal = '';
		if (captionElem !== null)
		{
			if (typeof captionElem.value === 'string')
			{
				capVal = captionElem.value;
			}
		}
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

		// If no images were uploaded, let the user know
		if (selectedImages === null)
		{
			alert('No files uploaded (png/jpg only)');
		}
		else if (selectedImages.length < 1)
		{
			alert('No files uploaded (png/jpg only)');
		}
		// Otherwise, refresh the page
		else
		{
			alert(`${selectedImages.length} image(s) uploaded. Page will automatically refresh in 10 seconds.`);
			setTimeout(function ()
			{
				window.location.reload();
			}, 10000);
		}
		const pendingFilesElem = document.getElementById('pending_files');
		if (pendingFilesElem !== null)
		{
			while (pendingFilesElem.lastElementChild !== null)
			{
				pendingFilesElem.removeChild(pendingFilesElem.lastElementChild);
			}
		}
	}

	const onDrop = useCallback(acceptedFiles =>
	{
		// Let the user know how many files are pending for upload
		const numFilesPending = acceptedFiles.length;
		const pendingFilesElem = document.getElementById('pending_files');
		if (pendingFilesElem !== null)
		{
			while (pendingFilesElem.lastElementChild !== null)
			{
				pendingFilesElem.removeChild(pendingFilesElem.lastElementChild);
			}
		}
		// Show files pending
		acceptedFiles.forEach((image) =>
		{

			//var div = document.createElement('div');
			//div.innerHTML = doc.data().caption;
			var img = document.createElement('img');
			img.src = URL.createObjectURL(image);
			if (pendingFilesElem !== null)
			{
				//pendingFilesElem.appendChild(div);
				pendingFilesElem.appendChild(img);
			}
		});
		if (pendingFilesElem !== null)
		{
			pendingFilesElem.style.opacity = 0.3;
			pendingFilesElem.style.filter = 'alpha(opacity=30)';
		}
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
			// Users can't upload more than 20 MB at a time
			maxSize: 20000000,
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

		//fileURLs = [];

		// Display each image from the query
		querySnapshot.forEach((doc) =>
		{
			if (imagesElem !== null)
			{
				// Add each file URL to the fileURLs array
				//fileURLs.push(doc.data().images);

				var verticalSpace = document.createElement('Text');
				verticalSpace.innerHTML = '<br />';

				doc.data().images.forEach((im) =>
				{
					let img = document.createElement('img');
					img.src = im;
					imagesElem.appendChild(img);
				});

				var caption = document.createElement('div');
				caption.innerHTML = doc.data().caption;

				// Create the trash icon from tablericons.com
				/*
				var icon = document.createElement('svg');
				icon.xmlns = 'http://www.w3.org/2000/svg';
				icon.height = '44';
				icon.width = '44';
				icon.viewBox = '0 0 24 24';
				icon.stroke = '#2c3e50';
				var line1 = document.createElement('line');  line1.x1 = '4';  line1.y1 = '7';  line1.x2 = '20';  line1.y2 = '7';
				var line2 = document.createElement('line');  line2.x1 = '10';  line2.y1 = '11';  line2.x2 = '10';  line2.y2 = '17';
				var line3 = document.createElement('line');  line3.x1 = '14';  line3.y1 = '11';  line3.x2 = '14';  line3.y2 = '17';
				var path1 = document.createElement('path');  path1.d = 'M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12';
				var path2 = document.createElement('path');  path2.d = 'M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3';
				icon.append(line1);
				icon.append(line2);
				icon.append(line3);
				icon.append(path1);
				icon.append(path2);
				*/

				// Create the delete button and includes the post's id in
				//   the button's id
				var deleteButton = document.createElement('button');
				deleteButton.innerHTML = 'Delete';
				deleteButton.color = '#dc1518';
				deleteButton.id = `delete_button_${doc.id}`;

				imagesElem.appendChild(caption);
				imagesElem.appendChild(verticalSpace);
				imagesElem.appendChild(deleteButton);
				//imagesElem.appendChild(icon);
				imagesElem.appendChild(verticalSpace);
				imagesElem.appendChild(verticalSpace);
				imagesElem.appendChild(verticalSpace);
			}
		});

		// Add a click listener to the document that handles deleting files from the
		//   Dropbox
		if (imagesElem !== null)
		{
			imagesElem.addEventListener('click', function (e)
			{
				// Only admins are allowed to delete files
				if (sessionStorage.getItem('_userLevel') === '2')
				{
					console.log(e.target.id);
					// Check to make sure the button clicked was one of the delete buttons
					//if(e.target && e.target.id.substring(0, 14) == 'delete_button_')
					if (e.target && (e.target.id).includes('delete_button_'));
					{
						// The id of the post to delete is the part of the button id after
						//   'delete_button_'
						// Ex: 'delete_button_n35f02fhjo954d3'
						const idToDelete = e.target.id.substring(14, String(e.target.id).length);
						console.log(idToDelete);

						// Check if an id was obtained
						if (typeof idToDelete === 'string')
						{
							if (idToDelete !== 'undefined' && idToDelete.length > 16)
							{
								// Get the document reference from Firestore using the id, and delete
								//   that document
								const docRef = doc(db, "posts", idToDelete);
								deleteDoc(docRef);
								alert('File(s) deleted. Page will automatically refresh in 10 seconds');
								setTimeout(function ()
								{
									window.location.reload();
								}, 10000);
							}
						}
					}
				}
				else
				{
					alert('Must be logged in with admin code to delete files');
					// TODO: allow users to re-login using admin code
				}
			});
		}
	}

	// Checks if the user entered the correct code
	async function check_code()
	{
		var wrongCodeElem = document.getElementById("wrong_code");
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
			codeInput = parseInt(codeElem.value, 10);
			if (typeof codeInput !== 'number')
			{
				fromCookieOnly = true;
				alert('From cookie only is true');
			}
		}

		// Element used to display error messages to the user


		// If the code only needs to be checked from the cookie file, then you don't
		//   need to do this part
		if (!fromCookieOnly)
		{
			if (!navigator.onLine)
			{
				if (wrongCodeElem !== null)
				{
					// Let the user know that the code couldn't be verified
					wrongCodeElem.innerHTML = "Code can\'t be verified offline";
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
					//if (typeof codeInput === 'number')  // (commented out for being redundant)
					//{
					if (typeof adminKey === 'number' && typeof regularKey === 'number')
					{
						// Multiply whatever the user entered by the admin encryption key,
						//   and check if that value equals the admin code from the database
						//if (((codeInput * adminKey) + 3 > adminCode) && ((codeInput * adminKey) - 3 < adminCode))
						if ((codeInput * adminKey) === adminCode)
						{
							// If they entered the correct admin code, set the cookie so that
							//   they remain logged in
							alert('Admin cookie set');
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
							alert('Regular cookie set');
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
					//}
				}
			}
		}
		// (end of if (!fromCookieOnly))

		// Check the code from the cookie file, and set the userLevel accordingly
		if (Cookies.get('admin') == adminCode)
		{
			alert('Admin verified');
			// sessionStorage variables persist even after the page is refreshed
			sessionStorage.setItem('_userLevel', '2');
			// Refresh the page
			window.location.reload();
		}
		else if (Cookies.get('regular') == regularCode)
		{
			alert('Regular verified');
			sessionStorage.setItem('_userLevel', '1');
			// Refresh the page
			window.location.reload();
		}
		else
		{
			alert('Wrong code verified');
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
					<div>
						{/* image(s) to be uploaded */}
						<span id="pending_files"></span>
					</div>
					<input id='caption' type="text" placeholder='optional caption' />
					<button onClick={uploadPost}>Submit</button>
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
					<div>
						{/* image(s) to be uploaded */}
						<span id="pending_files"></span>
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
