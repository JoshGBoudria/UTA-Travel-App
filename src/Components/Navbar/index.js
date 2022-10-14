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
                    { /* <NavLink to="/home" activeStyle> */}
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/contacts" activeStyle>
                        Emergency Contacts
                    </NavLink>
                    <NavLink to="/converter" activeStyle>
                        Currency Converter
                    </NavLink>
                    <NavLink to="/translation" activeStyle>
                        Audible Translations
                    </NavLink>
                    <NavLink to="/dropbox" activeStyle>
                        Dropbox
                    </NavLink>
                    <NavLink to="/itinerary" activeStyle>
                        Itinerary and Calendar
                    </NavLink>
                    <NavLink to="/updates" activeStyle>
                        Updates
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
  
export default Navbar;
