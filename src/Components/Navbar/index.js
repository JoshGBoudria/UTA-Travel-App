/* 
 * Shane Purdy 1001789955
 * 
 */


import React from "react";
import { Nav, NavLink, NavMenu } 
   from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        {/* Creates the layout for the navbar at the top of the screen.*/}
        <NavMenu>
          <NavLink to="/home" activeStyle>
            Home
          </NavLink>
          <NavLink to="/contacts" activeStyle>
            Emergency Contacts
          </NavLink>
          <NavLink to="/converter" activeStyle>
            Currency Converter
          </NavLink>
          <NavLink to="/dropbox" activeStyle>
            Dropbox
          </NavLink>
          <NavLink to="/itinerary" activeStyle>
            Itinerary and Calendar
          </NavLink>
          <NavLink to="/translation" activeStyle>
            Audible Translation
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;
