// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './jar.svg';
import './Navbar.css'; // Optional: Add styles for the navbar

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/Dashboard">
                    Dashboard
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/inputFood">Input Food</Link></li>
                <li><Link to="/inputWater">Input Water</Link></li>
                <li><Link to="/editUser">Edit User</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
