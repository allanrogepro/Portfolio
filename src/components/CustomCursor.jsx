import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x,
            y: mousePosition.y,
            scale: 1,
            rotate: 0,
            opacity: 1
        },
        hover: {
            x: mousePosition.x,
            y: mousePosition.y,
            scale: 1.2,
            rotate: -15, // A jaunty tilt on hover
            opacity: 0.8
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block" // Removed rounded-full
            variants={variants}
            animate={isHovering ? "hover" : "default"}
            transition={{
                type: "spring",
                stiffness: 800,
                damping: 35,
                mass: 0.5
            }}
            style={{
                // Ensure the tip of the arrow is at the coordinate
                translateX: "-2px",
                translateY: "-2px"
            }}
        >
            {/* Modern Black Arrow SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 3.5L19 12L12 19L5.5 3.5Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        </motion.div>
    );
};

export default CustomCursor;
