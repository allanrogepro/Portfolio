import React from 'react';
import { motion } from 'framer-motion';
import { SiAdobephotoshop, SiAdobeillustrator, SiTailwindcss } from 'react-icons/si';
import { FaFigma, FaReact } from 'react-icons/fa';
import { VscCode } from "react-icons/vsc";
import { IoLogoJavascript } from "react-icons/io5";

const techs = [
    { id: 1, icon: SiAdobephotoshop, color: '#31A8FF', name: 'Photoshop' },
    { id: 2, icon: SiAdobeillustrator, color: '#FF9A00', name: 'Illustrator' },
    { id: 3, icon: FaFigma, color: '#0acf83', name: 'Figma' },
    { id: 4, icon: VscCode, color: '#007ACC', name: 'VS Code' },
    { id: 5, icon: FaReact, color: '#61DAFB', name: 'React' },
    { id: 6, icon: SiTailwindcss, color: '#06B6D4', name: 'Tailwind' },
    { id: 7, icon: IoLogoJavascript, color: '#F7DF1E', name: 'JS' },
];

const TechStackMarquee = () => {
    return (
        <div className="w-full overflow-hidden bg-white py-12 mb-32 relative">
            {/* Fade gradients for smooth edge disappearance */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

            <div className="flex">
                <motion.div
                    className="flex gap-16 md:gap-24 items-center flex-shrink-0 px-8"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                    style={{ willChange: "transform" }}
                >
                    {/* Double the list for seamless loop */}
                    {[...techs, ...techs].map((tech, index) => (
                        <div key={index} className="flex flex-col items-center gap-4 group cursor-pointer relative">
                            <div className="text-5xl md:text-6xl transition-transform duration-300 group-hover:scale-110" style={{ color: tech.color }}>
                                <tech.icon />
                            </div>
                            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl z-20 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-black">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechStackMarquee;
