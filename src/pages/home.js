/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 */

import React from "react";
//import 'App.css';
/*import 'index.css';*/
                            
const Home = () =>
{
    // Initialize the variable to hold the index of which image is currently set as the background
    var index = 1;
    // Function to change the background image of the header to the current index's background image
    function changeBK()
    {
        // Checks to see if the current image is the last of the five or not
        if(index === 5)
        {
            // Adds 1 to the index if it is not
            index = 1; 
        } 
        else 
        { 
            // Resets the index back to 0 if it is
            index++;
        }
        // The following five if statements change the background image to an image determined by which value index is at.
        if(index === 1)
        {
            document.getElementById("header").style.backgroundImage = "url('ipb.jpg')";
        }
        if(index === 2)
        {
            document.getElementById("header").style.backgroundImage = "url('grapes.jpg')";
        }
        if(index === 3)
        {
            document.getElementById("header").style.backgroundImage = "url('sega.jpg')";
        }
        if(index === 4)
        {
            document.getElementById("header").style.backgroundImage = "url('building.jpg')";
        }
        if(index === 5)
        {
            document.getElementById("header").style.backgroundImage = "url('bamboo.jpg')";
        }
    };
    // Set a repeated interval for the background image changing function to run, making it go through the five given images.
    setInterval(changeBK, 5000);
    return (
        <>
            <head>
                    {/* Link the manifest.json file so that the PWA can be intalled */}
                    <link rel="manifest" href="manifest.json" />
                    <link rel="shortcut icon" href="#" />
                    <link rel="stylesheet" href="App.css"/>
                    <link rel="service" href="serviceWorker.js"/>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width = device-width, initial-scale = 1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie = edge" />
                    {/*<script src="app.js"> </script>*/}
                    <title> UTA Japan Trip PWA </title>
            </head>
            <div>
                    {/*Creates the header for the Home page and assign it an if for use in changing the background image.*/}
                    <header className="App-header" id="header">
                    </header>
            </div>            
        </>
    );
};
export default Home;
