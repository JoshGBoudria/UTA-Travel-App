/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
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
                    { /* Links to each page */}
                    <NavLink to="/" activestyle='true'>
                        Home
                    </NavLink>
                    <NavLink to="/itinerary" activestyle='true'>
                        Itinerary and Calendar
                    </NavLink>
                    <NavLink to="/converter" activestyle='true'>
                        Currency Converter
                    </NavLink>
                    <NavLink to="/translation" activestyle='true'>
                        Audible Translations
                    </NavLink>
                    <NavLink to="/dropbox" activestyle='true'>
                        Dropbox
                    </NavLink>
                    <NavLink to="/contacts" activestyle='true'>
                        Emergency Contacts
                    </NavLink>
                    <NavLink to="/admin" activestyle='true'>
                        Admin
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
  
export default Navbar;
