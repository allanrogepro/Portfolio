import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaFigma } from 'react-icons/fa';
import { SiAdobeillustrator } from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { MdArrowForward } from "react-icons/md";
import FeaturedCarousel from '../components/FeaturedCarousel';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageTransition from '../components/PageTransition';

const Home = ({ isAppLoading }) => {
    const controls = useAnimation();

    useEffect(() => {
        if (!isAppLoading) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isAppLoading, controls]);

    return (
        <PageTransition
            className="min-h-screen bg-gray-50 overflow-hidden"
        >
            <SEO
                title="Accueil"
                description="Portfolio d'Allan Rogé, étudiant en MMI. Découvrez mes projets en web design, développement et communication."
            />
            <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
                </div>

                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center relative z-10 w-full max-w-7xl">
                    <h1 className="sr-only">Allan Rogé - Portfolio Web Design, Développement et Communication Digitale</h1>

                    <div className="flex flex-col items-center text-center order-2 lg:order-1 lg:items-center w-full">
                        <div
                            className="relative flex flex-col items-center lg:items-start"
                        >
                            <motion.div
                                variants={{
                                    hidden: { opacity: 1 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.08, delayChildren: 0.2 }
                                    }
                                }}
                                initial="hidden"
                                animate={controls}
                                className="inline-flex flex-col font-black text-[12vw] lg:text-[10rem] leading-[0.85] text-black mb-6 select-none w-full lg:w-auto items-center lg:items-start gap-2 lg:gap-4"
                            >
                                <div className="flex tracking-tighter">
                                    {['A', 'L', 'L', 'A', 'N'].map((char, i) => (
                                        <motion.span
                                            key={i}
                                            variants={{
                                                hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
                                                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } }
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>
                                <div className="flex justify-between w-full">
                                    {['R', 'O', 'G', 'É'].map((char, i) => (
                                        <motion.span
                                            key={i}
                                            variants={{
                                                hidden: { opacity: 0, y: 20, filter: 'blur(12px)' },
                                                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6 } }
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100px" }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="h-2 bg-portfolio-yellow mb-8 lg:ml-2 mx-auto lg:mx-0"
                            />
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-xl md:text-2xl text-gray-500 font-medium max-w-lg mx-auto"
                        >
                            Étudiant en 2ème année de BUT MMI.
                            <br />Créatif, passionné et curieux.
                        </motion.p>
                    </div>

                    <div className="relative flex justify-center order-1 lg:order-2">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "backOut" }}
                            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem]"
                        >
                            <div className="absolute inset-0 bg-white rounded-full shadow-2xl transform rotate-3 z-10 transition-transform hover:rotate-6"></div>

                            <div className="absolute inset-2 bg-[#F3F4F6] rounded-full overflow-hidden border-4 border-gray-50 z-20 flex items-end justify-center">
                                <img
                                    src="/cleanv2.png"
                                    alt="Allan Rogé"
                                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <motion.div
                                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 z-30 bg-white p-4 rounded-2xl shadow-xl text-[#F24E1E]"
                            >
                                <FaFigma size={32} />
                            </motion.div>

                            <motion.div
                                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute top-1/2 -left-8 z-30 bg-white p-4 rounded-2xl shadow-xl text-[#007ACC]"
                            >
                                <VscCode size={32} />
                            </motion.div>

                            <motion.div
                                animate={{ y: [-5, 15, -5] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-4 right-10 z-30 bg-white p-4 rounded-2xl shadow-xl text-[#FF9A00]"
                            >
                                <SiAdobeillustrator size={32} />
                            </motion.div>
                        </motion.div>
                    </div>

                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Scroll</span>
                    <div className="w-[1px] h-12 bg-gray-200 overflow-hidden">
                        <motion.div
                            className="w-full h-1/2 bg-black"
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            </section>

            <section className="py-20 relative overflow-hidden bg-white">

                <div className="relative w-full rotate-2 md:rotate-1 scale-110 mb-20 border-y-4 border-black bg-portfolio-yellow py-4 overflow-hidden">
                    <motion.div
                        className="flex whitespace-nowrap"
                        style={{ willChange: "transform" }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="flex gap-4 px-4">
                                <span className="text-6xl md:text-8xl font-black uppercase text-black">
                                    Communication • Design • Développement • UI/UX • Stratégie •
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                        <div className="md:col-span-8 md:col-start-3 space-y-8 text-center md:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                                    Transformer des idées complexes en <motion.span
                                        initial={{ backgroundSize: "0% 100%" }}
                                        whileInView={{ backgroundSize: "100% 100%" }}
                                        viewport={{ once: false, amount: 0.2 }}
                                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                        style={{
                                            backgroundImage: "linear-gradient(#000, #000)",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "left center",
                                            display: "inline",
                                            WebkitBoxDecorationBreak: "clone",
                                            boxDecorationBreak: "clone"
                                        }}
                                        className="text-portfolio-yellow px-2"
                                    >
                                        expériences digitales
                                    </motion.span> mémorables.
                                </h3>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                                    Étudiant en 2ème année de BUT Métiers du Multimédia et de l'Internet,
                                    je combine technique et créativité pour concevoir des visuels et identités graphiques fortes
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-200"
                            >
                                <div>
                                    <h4 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-portfolio-yellow rounded-full"></div>
                                        Recherche
                                    </h4>
                                    <p className="text-gray-500">
                                        Stage de 9 à 10 semaines.<br />
                                        <strong className="text-black">Avril - Juin 2026</strong>
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-black rounded-full"></div>
                                        Focus
                                    </h4>
                                    <p className="text-gray-500">
                                        Communication Numérique<br />
                                        & Design d'Expérience
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black uppercase mb-4">Mes derniers projets</h2>
                        <div className="w-24 h-1 bg-portfolio-yellow mx-auto"></div>
                        <p className="text-xs tracking-widest text-gray-400 mt-2 uppercase">Des projets d'exception</p>
                    </div>

                    <FeaturedCarousel />

                    <div className="flex justify-center mt-12">
                        <Link to="/projects">
                            <motion.button
                                whileHover="hover"
                                initial="initial"
                                whileTap={{ scale: 0.95 }}
                                className="relative bg-black text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm overflow-hidden flex items-center gap-4 border border-white/20 hover:border-white transition-colors duration-300"
                            >
                                <div className="relative h-4 overflow-hidden flex flex-col items-start leading-none">
                                    <motion.span
                                        variants={{
                                            initial: { y: 0 },
                                            hover: { y: "-150%" }
                                        }}
                                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        Voir tous les projets
                                    </motion.span>
                                    <motion.span
                                        className="absolute inset-0"
                                        variants={{
                                            initial: { y: "150%" },
                                            hover: { y: 0 }
                                        }}
                                        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                    >
                                        Voir tous les projets
                                    </motion.span>
                                </div>
                                <motion.span
                                    variants={{
                                        initial: { x: 0 },
                                        hover: { x: 5 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-portfolio-yellow text-lg"
                                >
                                    <MdArrowForward />
                                </motion.span>
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default Home;
