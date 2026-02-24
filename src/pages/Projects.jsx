import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { supabase } from '../supabaseClient';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const Projects = () => {
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('TOUS');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    const filters = ['TOUS', 'WEB', 'COMMUNICATION'];

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('id', { ascending: false });

            if (!error && data) {
                setAllProjects(data);
            }
            setLoading(false);
        };
        fetchProjects();
    }, []);

    const filteredProjects = filter === 'TOUS'
        ? allProjects
        : allProjects.filter(p => p.category.includes(filter));

    // Pagination Logic
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <PageTransition
            className="pt-24 md:pt-32 pb-20 min-h-screen bg-gray-50"
        >
            <SEO
                title="Projets"
                description="Découvrez mes créations web, design et communication. Une collection de projets variés et créatifs."
            />
            {loading ? (
                <div className="flex justify-center items-center h-64 text-gray-400">Chargement des projets...</div>
            ) : (
                <div className="container mx-auto px-4 max-w-7xl">

                    <div className="text-center mb-20">
                        <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter">PROJETS</h1>
                        <p className="text-gray-500 font-medium text-lg uppercase tracking-widest">Une sélection de mes travaux</p>
                    </div>

                    <div className="sticky top-28 z-40 flex justify-center mb-20 pointer-events-none">
                        <div className="bg-white/80 backdrop-blur-xl p-1.5 rounded-3xl md:rounded-full shadow-lg border border-white/20 pointer-events-auto flex flex-wrap justify-center gap-2 max-w-full">
                            {filters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`relative px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${filter === f ? 'text-white' : 'text-gray-500 hover:text-black'
                                        }`}
                                >
                                    {filter === f && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-black rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{f}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='wait'>
                            {currentProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                                >
                                    <Link to={`/project/${project.id}`} className="block w-full h-full">
                                        <div className="relative overflow-hidden aspect-[4/3]">
                                            {project.video ? (
                                                <video
                                                    src={project.video}
                                                    muted
                                                    loop
                                                    playsInline
                                                    onMouseEnter={(e) => e.target.play()}
                                                    onMouseLeave={(e) => {
                                                        e.target.pause();
                                                        e.target.currentTime = 0;
                                                    }}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"></div>

                                            {/* Video Indicator */}
                                            {project.video && (
                                                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full text-white z-10">
                                                    <FaPlay size={12} />
                                                </div>
                                            )}

                                            <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center text-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                                <span className="inline-block px-3 py-1 bg-portfolio-yellow text-black text-xs font-bold uppercase rounded-full mb-4 transform scale-0 group-hover:scale-100 transition-transform delay-100">
                                                    {project.category}
                                                </span>

                                                <h3 className="text-3xl font-black text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform delay-100">
                                                    {project.title}
                                                </h3>

                                                <div className="w-12 h-1 bg-white mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform delay-200"></div>

                                                <div className="text-white text-sm font-bold uppercase tracking-widest border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors delay-200">
                                                    Voir le projet
                                                </div>
                                            </div>
                                        </div>

                                        {/* Mobile Content (Below Image) */}
                                        <div className="md:hidden p-6 flex flex-col items-start border-t border-gray-100">
                                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded mb-2">
                                                {project.category}
                                            </span>
                                            <h3 className="text-xl font-bold text-black mb-2 leading-tight">
                                                {project.title}
                                            </h3>
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                                Voir le projet <MdChevronRight />
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Pagination Controls */}
                    {
                        totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-20">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-3 rounded-full border border-gray-200 transition-colors ${currentPage === 1
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-black hover:bg-black hover:text-white border-black'
                                        }`}
                                >
                                    <MdChevronLeft size={24} />
                                </button>

                                <div className="flex items-center gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${currentPage === i + 1
                                                ? 'bg-portfolio-yellow text-black scale-110'
                                                : 'text-gray-500 hover:text-black hover:bg-gray-100'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-3 rounded-full border border-gray-200 transition-colors ${currentPage === totalPages
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-black hover:bg-black hover:text-white border-black'
                                        }`}
                                >
                                    <MdChevronRight size={24} />
                                </button>
                            </div>
                        )
                    }



                </div >
            )}
        </PageTransition >
    );
};

export default Projects;
