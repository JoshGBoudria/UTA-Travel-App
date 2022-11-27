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
            <Icon isOpen={toggle}>
                <CloseIcon />
            </Icon>
            <DropdownW>
                <DropdownMenu>
                    <DropdownLink to="itinerary" onClick={toggle}>Itinerary and Calendar</DropdownLink>
                    <DropdownLink to="converter" onClick={toggle}>Currency Converter</DropdownLink>
                    <DropdownLink to="translation" onClick={toggle}>Audible Translations</DropdownLink>
                    <DropdownLink to="dropbox" onClick={toggle}>Dropbox</DropdownLink>
                    <DropdownLink to="contacts" onClick={toggle}>Emergency Contacts</DropdownLink>
                    <DropdownLink to="admin" onClick={toggle}>Emergency Contacts</DropdownLink>
                </DropdownMenu>
            </DropdownW>
        </DropdownContainer>
    );
};
  
export default Dropdown;
