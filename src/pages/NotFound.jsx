import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import PageTransition from '../components/PageTransition';

const NotFound = () => {
    return (
        <PageTransition className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
            {/* Background Noise */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-black"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <div className="relative">
                    <h1 className="text-[12rem] md:text-[20rem] font-black text-white leading-none tracking-tighter mix-blend-difference select-none">
                        404
                    </h1>
                    <motion.div
                        animate={{ x: [-10, 10, -10] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                        className="absolute inset-0 text-[12rem] md:text-[20rem] font-black text-portfolio-yellow leading-none tracking-tighter opacity-30 mix-blend-overlay pointer-events-none"
                    >
                        404
                    </motion.div>
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-2xl md:text-4xl font-bold text-white uppercase tracking-widest mb-8"
                >
                    Page Introuvable
                </motion.h2>

                <p className="text-gray-400 max-w-md mx-auto mb-12 text-lg">
                    Il semblerait que vous vous soyez perdu dans le néant digital.
                </p>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-portfolio-yellow text-black px-10 py-4 rounded-full font-black uppercase tracking-widest flex items-center gap-2 mx-auto hover:bg-white transition-colors"
                    >
                        <span>Retour à l'accueil</span>
                        <MdArrowForward size={20} />
                    </motion.button>
                </Link>
            </motion.div>
        </PageTransition>
    );
};

export default NotFound;
