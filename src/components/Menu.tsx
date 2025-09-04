// import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
    return (
        <header className="menu-header">
            <nav className="menu-nav-left">
                <NavLink 
                    to="/drawings" 
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    drawings
                </NavLink>
                <NavLink 
                    to="/shop" 
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    shop
                </NavLink>
            </nav>
            
            <NavLink to="/" className="logo-link">
                <img src="/images/logo.png" alt="Logo" className="logo" />
            </NavLink>
            
            <nav className="menu-nav-right">
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    story
                </NavLink>
                <NavLink 
                    to="/contact" 
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    contact
                </NavLink>
                <NavLink 
                    to="/cart" 
                    className={({ isActive }) => isActive ? 'active' : ''}
                >
                    cart
                </NavLink>
            </nav>
        </header>
    );
}