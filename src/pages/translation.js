/* 
 * Shane Purdy 1001789955
 * Bryson Neel
 * 
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
			{/* Create a list without bullet points */}
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
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Good Bye!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Good-Bye.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Good Evening!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Good-Evening.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Good Morning!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Good-Morning.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Hello!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Hello.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					I am sorry!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/I-Am-Sorry.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					I do not understand.
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/I-Do-Not-Understand.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					My name is...
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/My-Name-Is.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					No.
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/No.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Please!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Please.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Please tell me your name!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Please-Tell-Me-Your-Name.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					See you later!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/See-You-Later.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Thanks for what you did!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Thanks-For-What-You-Did.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Thank you!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Thank-You.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					That is alright!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/That-Is-Alright.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Where is restroom?
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Where-Is-Restroom.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					Yes.
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/Yes.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
                                <li>
					You are welcome!
					<p style={{ textAlign: 'center' }}>
						<audio controls>
							<source src={require("../translations/You-Are-Welcome.mp3")} type="audio/mpeg" />
							Your browser does not support HTML5 audio.
						</audio>
					</p>
					{/* TODO: Display the rest of the translations */}
				</li>
			</ul >
		</>
	);
};

export default Translation;
