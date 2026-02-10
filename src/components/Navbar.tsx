import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { label: 'Home', href: 'index.html' },
        {
            label: 'About',
            href: '#',
            dropdown: [
                { label: 'About Us', href: 'aboutpage.html' },
                { label: 'Shoutouts', href: 'shoutouts.html' }
            ]
        },
        { label: 'PYQ', href: 'subtittlepyq.html' },
        { label: 'Tests', href: 'testfirstpage.html' },
        {
            label: 'Future Career',
            href: '#',
            dropdown: [
                { label: 'Future Career', href: 'future.html' },
                { label: 'Science News', href: 'sciencenews.html' }
            ]
        }
    ];

    return (
        <nav className="navbar flex justify-between items-center px-[5%] py-5 fixed top-0 w-full z-[1000] bg-black/90 backdrop-blur-xl border-b border-white/5">
            <a href="index.html" className="logo flex items-baseline">
                <span className="logo-vigyan text-2xl font-bold italic uppercase">Vigyan</span>
                <span className="logo-dot text-lg opacity-60">.</span>
                <span className="logo-prep text-sm opacity-50 lowercase">prep</span>
            </a>

            {/* Hamburger Toggle (Visible on Mobile/Tablet) */}
            <button
                className="lg:hidden z-[1100] p-2 text-white"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Navbar Links (Desktop & Mobile Overlay) */}
            <div className={`
                nav-links fixed lg:static top-0 right-0 h-screen lg:h-auto w-full lg:w-auto
                bg-black/98 lg:bg-transparent backdrop-blur-2xl lg:backdrop-blur-none
                flex flex-col lg:flex-row items-center justify-center lg:justify-start
                gap-10 lg:gap-8 transition-all duration-500 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                z-[1050] lg:z-auto
            `}>
                {navItems.map((item, idx) => (
                    <div key={idx} className="relative group flex flex-col items-center">
                        {item.dropdown ? (
                            <>
                                <button className="text-xl lg:text-sm font-semibold tracking-wide text-white/70 hover:text-white transition-colors">
                                    {item.label}
                                </button>
                                <div className="hidden group-hover:flex lg:absolute top-full left-1/2 -translate-x-1/2 pt-4 flex-col gap-2 min-w-[200px]">
                                    <div className="bg-black/90 border border-white/10 rounded-xl p-2 flex flex-col items-center">
                                        {item.dropdown.map((sub, sIdx) => (
                                            <a
                                                key={sIdx}
                                                href={sub.href}
                                                className="w-full text-center px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {sub.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <a
                                href={item.href}
                                className="text-xl lg:text-sm font-semibold tracking-wide text-white/70 hover:text-white transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        )}
                    </div>
                ))}

                <a
                    href="signinpage.html"
                    className="btn-login px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-white lg:text-sm"
                    onClick={() => setIsMenuOpen(false)}
                >
                    Login
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
