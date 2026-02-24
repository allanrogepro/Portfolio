import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ onOpenContact }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navLinks = [
        { path: '/about', label: 'À propos' },
        { path: '/projects', label: 'Projets' },
    ];

    return (
        <div className="fixed top-4 md:top-8 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="bg-black/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl px-2 py-2 pl-4 flex items-center gap-4 max-w-4xl w-full justify-between transition-all duration-300 relative">

                <div className="flex items-center gap-8">
                    <div className="flex-shrink-0 z-50">
                        <NavLink to="/" onClick={closeMenu} className="block w-12 h-12 bg-white rounded-full p-1.5 transition-transform hover:scale-105 active:scale-95">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </NavLink>
                    </div>

                    <ul className="hidden md:flex items-center gap-6 font-medium text-sm">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => `relative transition-colors hover:text-gray-300 ${isActive ? 'text-white font-bold' : 'text-gray-400'}`}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.label}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="underline"
                                                    className="absolute left-0 right-0 -bottom-1 h-[2px] bg-portfolio-yellow"
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-4 z-50">
                    <button
                        onClick={() => { onOpenContact(); closeMenu(); }}
                        className="group bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-all flex items-center gap-2 hover:pr-8 relative overflow-hidden"
                    >
                        <span>Contact</span>
                        <span className="absolute right-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                            <FaPaperPlane size={12} />
                        </span>
                    </button>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/10 rounded-full active:scale-90 transition-transform"
                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-24 left-4 right-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl md:hidden overflow-hidden"
                    >
                        <ul className="flex flex-col gap-4 text-center">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) => `text-lg font-bold uppercase tracking-widest ${isActive ? 'text-portfolio-yellow' : 'text-white'}`}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;
