/* 
 * Shane Purdy 1001789955
 * 19 phrases to translate
 */


import React from "react";


const Translation = () => {
	return (
		<>
			<head>
				<link rel="shortcut icon" href="#" />
			</head>
			<ul>
				<li>
					Do you speak English?
					<p /*style="text-align: right;"*/>
						<audio controls>
							<source src={require("../translations/Do You Speak English.wav") } type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
				</li>
				<li>
					Excuse me.
					<p /*style="text-align: right;"*/>
						<audio controls>
							<source src={require("../translations/Excuse Me.wav")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
				</li>
			</ul >
		</>
  );
};
  
export default Translation;