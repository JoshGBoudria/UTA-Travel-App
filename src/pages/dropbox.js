/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 * Open source icon retrieved from https://tablericons.com/ 
 */


import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';


const Dropbox = () =>
{
	const [files, setFiles] = useState([]);
	const { getRootProps, getInputProps } = useDropzone(
	{
		// Users can only upload images (might change this later)
		accept: "image/*",
		// Users can't upload more than 5MB at a time
		maxSize: 5000000,
		multiple: false,
		onDrop: (acceptedFiles) =>
		{
			setFiles(
				acceptedFiles.map((file) => Object.assign(file,
				{
					preview: URL.createObjectURL(file)
				}))
			)
		},
	});

	const images = files.map((file) =>
	(
		<div key={file.name}>
			<div>
				{/* Display the image that was uploaded (later change it so that it just stores it in the database) */}
				<img src={file.preview} style={{ display: 'block', 'margin-left': 'auto', 'margin-right': 'auto', width: '400px', height: 'auto' }} alt="preview" />
			</div>
		</div>
	));

	return (
		<div>
			{/*The header for the Dropbox.*/}
			<h1> Dropbox </h1>
			{/* File upload */}
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{/* Display upload icon */}
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-upload" width="100" height="100" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
					<polyline points="7 9 12 4 17 9" />
					<line x1="12" y1="4" x2="12" y2="16" />
				</svg>
				<p>Upload image file</p>
			</div>
			<div>{images}</div>
		</div>
	);
};

export default Dropbox;
