/* 
 * Shane Purdy 1001789955
 * 
 */

import React from "react";
import '../App.css';

const Converter = () => {
  return (
    <div class="App-Converter">
        <h1> Currency Converter </h1>
        <div>
            <p> YEN to USD </p>
            <input type="text" id="USD" placeholder="Enter USD" maxlength="15"/>
            <button id="USDConv">Convert</button>
            </div>
        <div>
            <p> USD to YEN </p>
            <input type="text" id="YEN" placeholder="Enter YEN" maxlength="15"/>
            <button id="YENConv">Convert</button>
            </div>
    </div>
    );
};
  
export default Converter;