import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const FeaturedCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProjects = async () => {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .eq('featured', true)
                .limit(4);

            if (data) setProjects(data);
            setLoading(false);
        };
        fetchFeaturedProjects();
    }, []);

    const nextSlide = () => {
        if (projects.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        if (projects.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center overflow-hidden perspective-1000">
            {/* Decoration Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/50 pointer-events-none"></div>

            <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
                {projects.map((project, index) => {
                    const dist = index - currentIndex;
                    // Fix wrap logic for visual calc only
                    let visualDist = dist;
                    if (visualDist > projects.length / 2) visualDist -= projects.length;
                    if (visualDist < -projects.length / 2) visualDist += projects.length;

                    const isCenter = visualDist === 0;

                    const isVisible = Math.abs(visualDist) <= 2;

                    if (!isVisible) return null;

                    return (
                        <motion.div
                            key={project.id}
                            className={`absolute w-[300px] md:w-[400px] aspect-[3/4] rounded-3xl shadow-2xl overflow-hidden cursor-pointer bg-white border border-gray-100`}
                            initial={false}
                            animate={{
                                x: `${visualDist * 55}%`,
                                scale: isCenter ? 1 : 0.85,
                                opacity: Math.abs(visualDist) > 1 ? 0 : isCenter ? 1 : 0.4,
                                zIndex: 10 - Math.abs(visualDist),
                                rotateY: visualDist * -5,
                                willChange: "transform, opacity"
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                            drag={isCenter ? "x" : false}
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = offset.x;

                                if (swipe < -100) {
                                    nextSlide();
                                } else if (swipe > 100) {
                                    prevSlide();
                                }
                            }}
                            onClick={() => {
                                if (Math.abs(visualDist) < 0.1) return; // Allow click on center for link
                                setCurrentIndex(index);
                            }}
                            style={{
                                display: isVisible ? 'block' : 'none', // Optimization
                            }}
                        >
                            {/* Image Part */}
                            <div className="h-[75%] w-full bg-gray-200">
                                <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
                            </div>

                            {/* Content Part */}
                            <div className="h-[25%] bg-white p-5 flex flex-col justify-center relative">
                                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">{project.category}</span>
                                <h3 className="text-xl md:text-2xl font-black text-black leading-tight">{project.title}</h3>

                                <AnimatePresence>
                                    {isCenter && (
                                        <Link to={`/project/${project.id}`}>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="absolute bottom-6 right-6 bg-black text-white p-3 rounded-full hover:bg-portfolio-yellow hover:text-black transition-colors"
                                            >
                                                <FaArrowRight size={14} />
                                            </motion.div>
                                        </Link>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Buttons */}
            {/* Navigation Buttons - Hidden on mobile (swipe enabled) */}
            <button
                onClick={prevSlide}
                className="hidden md:flex absolute left-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center hover:scale-110 transition-transform active:scale-95"
                aria-label="Previous project"
            >
                <FaArrowLeft />
            </button>

            <button
                onClick={nextSlide}
                className="hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black text-white shadow-lg items-center justify-center hover:scale-110 transition-transform active:scale-95"
                aria-label="Next project"
            >
                <FaArrowRight />
            </button>
        </div>
    );
};

export default FeaturedCarousel;
