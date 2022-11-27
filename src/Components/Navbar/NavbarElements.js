/* 
 * Shane Purdy 1001789955
 * react-scroll
 */


import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import { Link as LinkR } from 'react-router-dom'
import { NavLink as Link } from "react-router-dom";
  
// Creates the style for the navigation bar.
export const Nav = styled.nav`
    background: #000;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
    }
`;
  
export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    x-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`;
  
// Creates the style for the words in the navigation bar.
export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`;
  
export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }
`;
  
export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: 2px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.li`
    align-items: center;
    font-size: 22px;
`;
  
export const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%
    cursor: pointer;
    
    &.active {
        border-bottom: 3px solid #01bf71;
    }
`;

