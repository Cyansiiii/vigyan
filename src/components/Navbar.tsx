import React, { useState } from 'react';
import { MoreVertical, X } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

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
            <a href="index.html" className="logo flex items-baseline z-[1100]">
                <span className="logo-vigyan text-2xl font-bold italic uppercase">Vigyan</span>
                <span className="logo-dot text-lg opacity-60">.</span>
                <span className="logo-prep text-sm opacity-50 lowercase">prep</span>
            </a>

            {/* Hamburger Toggle (Three Dots) */}
            <button
                className="lg:hidden z-[1100] p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-all"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X size={28} /> : <MoreVertical size={28} />}
            </button>

            {/* Navbar Links Overlay - Fixed positioning for mobile */}
            <div className={`
                fixed lg:static inset-0 lg:inset-auto h-screen lg:h-auto w-full lg:w-auto
                bg-black lg:bg-transparent backdrop-blur-3xl lg:backdrop-blur-none
                flex flex-col lg:flex-row items-center justify-center lg:justify-start
                gap-8 lg:gap-8 transition-all duration-300 ease-in-out
                ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 lg:translate-y-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto'}
                z-[1050] lg:z-auto
            `}>
                {navItems.map((item, idx) => (
                    <div key={idx} className="relative group flex flex-col items-center w-full lg:w-auto">
                        {item.dropdown ? (
                            <div className="flex flex-col items-center w-full">
                                <span className="text-xl lg:text-sm font-bold uppercase tracking-[2px] text-white/30 lg:text-white/70 mb-4 lg:mb-0">
                                    {item.label}
                                </span>
                                <div className="flex flex-col lg:hidden gap-4 mb-4">
                                    {item.dropdown.map((sub, sIdx) => (
                                        <a
                                            key={sIdx}
                                            href={sub.href}
                                            className="text-2xl text-white font-medium hover:text-blue-400 transition-colors text-center"
                                            onClick={() => { setIsMenuOpen(false); document.body.style.overflow = 'unset'; }}
                                        >
                                            {sub.label}
                                        </a>
                                    ))}
                                </div>
                                {/* Desktop Dropdown */}
                                <div className="hidden lg:group-hover:flex absolute top-full left-1/2 -translate-x-1/2 pt-4 flex-col gap-2 min-w-[200px]">
                                    <div className="bg-black/95 border border-white/10 rounded-xl p-2 flex flex-col items-center shadow-2xl">
                                        {item.dropdown.map((sub, sIdx) => (
                                            <a
                                                key={sIdx}
                                                href={sub.href}
                                                className="w-full text-center px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                            >
                                                {sub.label}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <a
                                href={item.href}
                                className="text-3xl lg:text-sm font-semibold tracking-wide text-white hover:text-blue-400 transition-colors"
                                onClick={() => { setIsMenuOpen(false); document.body.style.overflow = 'unset'; }}
                            >
                                {item.label}
                            </a>
                        )}
                    </div>
                ))}

                <a
                    href="signinpage.html"
                    className="mt-8 lg:mt-0 px-12 py-4 lg:px-6 lg:py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-bold text-white text-xl lg:text-xs shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                    onClick={() => { setIsMenuOpen(false); document.body.style.overflow = 'unset'; }}
                >
                    Login
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
