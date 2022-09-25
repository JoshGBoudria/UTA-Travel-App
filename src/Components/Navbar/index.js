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
          <NavLink to="/login" activeStyle>
            Login
          </NavLink>
          <NavLink to="/translation" activeStyle>
            Audible Translation
          </NavLink>
          <NavLink to="/translator" activeStyle>
            Written Translator
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;