import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
            {/* Container for initial fade in - runs ONCE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }}
                transition={{ duration: 0.5 }}
                className="w-64 h-64 md:w-96 md:h-96"
            >
                {/* Inner Image for infinite pulse - runs FOREVER */}
                <motion.img
                    src="/logo.png"
                    alt="Loading..."
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 0.5
                    }}
                    className="w-full h-full object-contain"
                />
            </motion.div>

            {/* Progress Bar */}
            <div className="w-64 h-1 bg-gray-200 mt-8 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-portfolio-yellow"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </div>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-8 text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-black"
            >
                Bienvenue
            </motion.h2>
        </motion.div>
    );
};

export default Loader;
