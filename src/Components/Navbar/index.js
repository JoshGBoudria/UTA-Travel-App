/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 */


import React, { useState } from 'react';
import {FaBars} from 'react-icons/fa'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks } from "./NavbarElements";
  
const Navbar =  ({ toggle }) => {
    return (
        <>
            {/*Creates the Navbar.*/}
            <Nav>
            <NavbarContainer>
                {/*Creates the home page button.*/}
                <NavLogo to='/'>UTA</NavLogo>
                {/*Creates the dropdown menu button and selects the image used for it.*/}
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                {/*Creates the menu setup on the navbar.*/}
                <NavMenu>
                    <NavItem>
                        <NavLinks to="itinerary">Itinerary and Calendar</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="converter">Currency Converter</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="translation">Audible Translations</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="dropbox">Dropbox</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="contacts">Emergency Contacts</NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to="admin">Admin</NavLinks>
                    </NavItem>
                </NavMenu>
            </NavbarContainer>
            </Nav>
        </>
    );
};
  
export default Navbar;
