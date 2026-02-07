import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <a href="index.html" className="logo">
                <span className="logo-vigyan">Vigyan</span>
                <span className="logo-dot">.</span>
                <span className="logo-prep">prep</span>
            </a>
            <div className="nav-links">
                <a href="index.html">Home</a>
                <div className="nav-dropdown">
                    <a href="#" className="dropdown-trigger">About</a>
                    <div className="dropdown-menu">
                        <a href="aboutpage.html">About Us</a>
                        <a href="shoutouts.html">Shoutouts</a>
                    </div>
                </div>
                <a href="subtittlepyq.html">PYQ</a>
                <a href="testfirstpage.html">Tests</a>
                <div className="nav-dropdown">
                    <a href="#" className="dropdown-trigger">Future Career</a>
                    <div className="dropdown-menu">
                        <a href="future.html">Future Career</a>
                        <a href="sciencenews.html">Science News</a>
                    </div>
                </div>
                <a href="signinpage.html" className="btn-login">Login</a>
            </div>
        </nav>
    );
};

export default Navbar;
