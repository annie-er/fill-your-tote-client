import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
    return (
        <nav className="menu-nav">
            <div className="menu-left">
                <NavLink to="/drawings">DRAWINGS</NavLink>
                <NavLink to="/shop">SHOP</NavLink>
                <NavLink to="/services">SERVICES</NavLink>
            </div>
            
            <div className="menu-center">
                <NavLink to="/" className="logo-link">
                    <img src="/logo.png" alt="Logo" className="logo" />
                </NavLink>
            </div>
            
            <div className="menu-right">
                <NavLink to="/about">ABOUT</NavLink>
                <NavLink to="/contact">CONTACT</NavLink>
                <NavLink to="/cart">CART</NavLink>
            </div>
        </nav>
    )
}