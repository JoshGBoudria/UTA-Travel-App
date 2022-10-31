/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 * Open source icon retrieved from https://tablericons.com/ 
 */


import React/*, { useState }*/ from "react";
import { useDropzone } from 'react-dropzone';
import Cookies from "js-cookie";

const Dropbox = (props) =>
{
	const
		{
			acceptedFiles,
			fileRejections,
			getRootProps,
			getInputProps
		} = useDropzone({
			// Users can only upload jpg and png images (later change to allow videos, too)
			accept:
			{
				'image/jpg': [],
				'image/png': []/*,
				'video/mp4': [],
				'video/mov': [],
				'video/avi': []*/
			},
		});

	const acceptedFileItems = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	const fileRejectionItems = fileRejections.map(({ file, errors }) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
			<ul>
				{errors.map(e => (
					<li key={e.code}>{e.message}</li>
				))}
			</ul>
		</li>
	));



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
		return (
			<div>
				{/*The header for the Dropbox.*/}
				<h1> Dropbox </h1>
				{/* File upload */}
				<input {...getInputProps()} />
				<div {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					{/* Display the upload icon */}
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-upload" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
						<polyline points="7 9 12 4 17 9" />
						<line x1="12" y1="4" x2="12" y2="16" />
					</svg>
					<p>Tap to upload file</p>
					<em>(.jpeg or .png)</em>
				</div>
				<div>{acceptedFileItems}</div>
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
