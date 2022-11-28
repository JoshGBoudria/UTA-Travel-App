/* 
 * Shane Purdy 1001789955
 * 
    //opacity: ${({ isOpen }) -> (isOpen ? '100%' : '0')};
    //top: ${({ isOpen }) -> (isOpen ? '0' : '-100%')};
 */


import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import {Link as LinkR} from 'react-router-dom'
import { NavLink as Link } from "react-router-dom";

export const DropdownContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%
    height: 100%
    background: #0d0d0d;
    display: grid;
    align-items: center;
    top: 20rem;
    left: 19.5rem;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`;
  
export const Icon = styled.div`
position: absolute;
top: 1.2rem;
right: 1.5rem;
background: #000000;
font-size: 2rem;
cursor: pointer;
outline: none;
`;

export const DropdownW = styled.div`
    color: #fff;
`;

export const DropdownMenu = styled.ul`
    display: none;
    grid-template-columns: lfr;
    grid-template-rows: repeat(6, 280px);
    text-align: center;

    @media screen and (max-width: 600px) {
        display: grid;
        grid-template-rows: repeat(6, 70px);
        background: #000000;
        background-size: cover;
    }
`;

export const DropdownLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    
    &:hover {
        color: #7EC8E3;
        transition: 0.2s ease-in-out;
    }
`;

export const DropdownRoute = styled(LinkR)`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 16px 64px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #7EC8E3;
    }
`;

