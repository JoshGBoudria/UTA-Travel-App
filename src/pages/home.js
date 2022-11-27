/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 */

import React from "react";

const Home = () =>
{
    // Initialize the variable to hold the index of which image is currently set as the background
    var index = 0;
    // Function to change the background image of the header to the current index's background image
    function changeBK()
    {
        // If the current index is 4, set it to 0; otherwise, add 1 to it
        index = index === 4 ? 0 : index + 1;

        // Element that contains the background image
        var header = document.getElementById("header");

        // Images to display
        const images = ["url('res/ipb.jpg')", "url('res/grapes.jpg')", "url('res/sega.jpg')", "url('res/building.jpg')", "url('res/bamboo.jpg')"]

        // Changes the background image based on the index value
        if (header !== null)
        {
            header.style.backgroundImage = images[index];
        }
    }

    // Set a repeated interval for the background image changing function to run, making it go through the five given images.
    setInterval(changeBK, 5000);
    
    return (
        <>
            <head>
                <link rel="shortcut icon" href="#" />
                <link rel="stylesheet" href="App.css" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width = device-width, initial-scale = 1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie = edge" />
                <title> UTA Japan Trip App </title>
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
