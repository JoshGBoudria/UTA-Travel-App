/* 
 * Shane Purdy 1001789955
 * Bryson Neel 1001627866
 * 
 */

import React, { useState } from 'react';
import {FaBars} from 'react-icons/fa'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { DropdownContainer, Icon, CloseIcon, DropdownW, DropdownMenu, DropdownLink, DropdownRoute } from "./DropdownElements";

  
const Dropdown = ({isOpen, toggle }) => {
    return (
        <DropdownContainer isOpen={isOpen} onClick={toggle}>
            {/*Create the close icon for the dropdown menu.*/}
            <Icon isOpen={toggle}>
                <CloseIcon />
            </Icon>
            {/*Create the wrapper to hold the contents of the dropdown menu.*/}
            <DropdownW>
                {/*Create the dropdown menu contents.*/}
                <DropdownMenu>
                    <DropdownLink to="itinerary" onClick={toggle}>Itinerary and Calendar</DropdownLink>
                    <DropdownLink to="converter" onClick={toggle}>Currency Converter</DropdownLink>
                    <DropdownLink to="translation" onClick={toggle}>Audible Translations</DropdownLink>
                    <DropdownLink to="dropbox" onClick={toggle}>Dropbox</DropdownLink>
                    <DropdownLink to="contacts" onClick={toggle}>Emergency Contacts</DropdownLink>
                    <DropdownLink to="admin" onClick={toggle}>Admin</DropdownLink>
                </DropdownMenu>
            </DropdownW>
        </DropdownContainer>
    );
};
  
export default Dropdown;
