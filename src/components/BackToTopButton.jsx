import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility based on scroll position - simplified for reliability
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top handler
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.2 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-black text-white rounded-full shadow-lg border border-white/10 hover:bg-portfolio-yellow hover:text-black transition-colors group"
                    aria-label="Retour en haut"
                >
                    <FaArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    {/* Optional ring effect */}
                    <span className="absolute inset-0 rounded-full border border-white/20 scale-110 opacity-0 group-hover:scale-125 group-hover:opacity-100 transition-all duration-300"></span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTopButton;
