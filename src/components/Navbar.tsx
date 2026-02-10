import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="navbar">
            <a href="index.html" className="logo">
                <span className="logo-vigyan">Vigyan</span>
                <span className="logo-dot">.</span>
                <span className="logo-prep">prep</span>
            </a>

            {/* Hamburger Toggle */}
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                <a href="index.html" onClick={() => setIsMenuOpen(false)}>Home</a>
                <div className="nav-dropdown">
                    <a href="#" className="dropdown-trigger">About</a>
                    <div className="dropdown-menu">
                        <a href="aboutpage.html" onClick={() => setIsMenuOpen(false)}>About Us</a>
                        <a href="shoutouts.html" onClick={() => setIsMenuOpen(false)}>Shoutouts</a>
                    </div>
                </div>
                <a href="subtittlepyq.html" onClick={() => setIsMenuOpen(false)}>PYQ</a>
                <a href="testfirstpage.html" onClick={() => setIsMenuOpen(false)}>Tests</a>
                <div className="nav-dropdown">
                    <a href="#" className="dropdown-trigger">Future Career</a>
                    <div className="dropdown-menu">
                        <a href="future.html" onClick={() => setIsMenuOpen(false)}>Future Career</a>
                        <a href="sciencenews.html" onClick={() => setIsMenuOpen(false)}>Science News</a>
                    </div>
                </div>
                <a href="signinpage.html" className="btn-login" onClick={() => setIsMenuOpen(false)}>Login</a>
            </div>
        </nav>
    );
};

export default Navbar;
