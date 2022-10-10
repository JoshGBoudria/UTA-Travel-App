/* 
 * Shane Purdy 1001789955
 * Bryson Neel
 * 19 phrases to translate
 */

import React from "react";

const Translation = () =>
{
	return (
		<>
			<head>
				{/* Link to the shorcut icon so that audio components display properly */}
				<link rel="shortcut icon" href="#" />
			</head>
			{/* Create a list without bullet points*/}
			<ul style={{ listStyleType: "none" }}>
				<li>
					Do you speak English?
					{/* Center the buttons*/}
					<p style={{ textAlign: 'center' }}>

						{/* Create audio component with controls enabled*/}
						<audio controls>
							<source src={require("../translations/Do-You-Speak-English.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
				</li>
				<li>
					Excuse me.
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Excuse-Me.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
				</li>
			</ul >
		</>
	);
};

export default Translation;