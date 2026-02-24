import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaInstagram, FaGithub, FaBehance } from 'react-icons/fa';
import { MdArrowOutward } from "react-icons/md";

const Footer = ({ onOpenContact }) => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/allan_rge/' },
        { name: 'LinkedIn', icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/allan-roge-124747388/' },
    ];

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Projets', path: '/projects' },
        { name: 'À propos', path: '/about' },
    ];

    return (
        <footer className="bg-black text-white pt-12 pb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 to-transparent"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    <div className="flex flex-col items-start justify-center">
                        <button
                            onClick={onOpenContact}
                            className="group relative inline-block text-left"
                        >
                            <span className="text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tighter group-hover:text-portfolio-yellow transition-colors duration-300">
                                Travaillons ensemble.
                            </span>
                            <motion.span
                                initial={{ scale: 0, rotate: 45 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                className="inline-block ml-3 p-1.5 bg-portfolio-yellow text-black rounded-full text-xl align-top opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2"
                            >
                                <MdArrowOutward />
                            </motion.span>
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-end gap-12 md:gap-24">

                        <div className="flex flex-col gap-2 text-sm">
                            <h3 className="text-gray-500 font-bold uppercase tracking-widest mb-1 text-[10px]">Menu</h3>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="font-bold hover:text-portfolio-yellow transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-gray-400">
                            <h3 className="text-gray-500 font-bold uppercase tracking-widest mb-1 text-[10px]">Infos</h3>
                            <a href="mailto:allanrogepro@gmail.com" className="hover:text-white transition-colors">allanrogepro@gmail.com</a>
                            <a href="tel:0768751966" className="hover:text-white transition-colors">07.68.75.19.66</a>
                            <span>LENS, France</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

                    <div className="text-xs text-gray-600 font-medium">
                        &copy; 2026 ROGÉ Allan. Tous droits réservés. • <Link to="/legal" className="hover:text-white transition-colors">Mentions Légales</Link>
                    </div>

                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-gray-400 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 text-sm"
                                aria-label={social.name}
                            >
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
