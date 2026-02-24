import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { supabase } from '../supabaseClient';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    // useDocumentTitle(project?.title); // Replaced by SEO component
    const [allProjects, setAllProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            setLoading(true);
            // We fetch ALL projects to handle Next/Prev navigation easily
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('id', { ascending: false });

            if (data) {
                setAllProjects(data);
                const current = data.find(p => p.id === parseInt(id));
                setProject(current || null);
            }
            setLoading(false);
        };

        fetchProjectData();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Projet introuvable</p>
                <button onClick={() => navigate('/projects')} className="ml-4 underline">Retour</button>
            </div>
        );
    }

    return (
        <PageTransition
            className="min-h-screen bg-white pt-24 md:pt-32 pb-20"
        >
            {project && (
                <SEO
                    title={project.title}
                    description={project.description ? project.description.substring(0, 150) + '...' : `Détails du projet ${project.title}`}
                    image={project.image}
                />
            )}
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Back Button */}
                <button
                    onClick={() => navigate('/projects')}
                    className="group flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors"
                >
                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                        <FaArrowLeft />
                    </div>
                    <span className="font-bold uppercase text-sm tracking-widest">Retour aux projets</span>
                </button>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                        <div>
                            <span className="inline-block px-3 py-1 bg-portfolio-yellow text-black text-xs font-bold uppercase rounded-full mb-4">
                                {project.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2">{project.title}</h1>
                            <p className="text-xl text-gray-500 font-medium">{project.year}</p>
                        </div>

                        {/* Links */}
                        <div className="flex gap-4">
                            {project.repo && (
                                <a
                                    href={project.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full font-bold hover:bg-black hover:text-white transition-colors"
                                >
                                    <FaGithub size={20} />
                                    <span>Code</span>
                                </a>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-portfolio-yellow hover:text-black transition-colors"
                                >
                                    <FaExternalLinkAlt size={18} />
                                    <span>Voir le site</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Media (Video or Image) */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-16 bg-gray-100 relative group"
                >
                    {project.video ? (
                        <video
                            src={project.video}
                            poster={project.image}
                            controls
                            controlsList="nodownload"
                            onContextMenu={(e) => e.preventDefault()}
                            className="w-full h-full object-contain bg-gray-100"
                        >
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    ) : (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    {/* Description */}
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-black uppercase mb-6">À propos</h2>
                        <div className="prose prose-lg text-gray-600 leading-relaxed">
                            <p>{project.description}</p>
                        </div>
                    </div>

                    {/* Sidebar / Technologies */}
                    <div>
                        <h2 className="text-xl font-black uppercase mb-6">Technologies</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies && project.technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-600"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="mb-20">
                        <h2 className="text-3xl font-black uppercase mb-8 border-b border-gray-200 pb-4">Galerie</h2>
                        <div className="columns-1 md:columns-2 gap-8 space-y-8">
                            {project.gallery.map((img, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="break-inside-avoid rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-gray-50 mb-8 cursor-pointer group"
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-auto group-hover:scale-105 transition-transform duration-700 block"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="border-t border-gray-200 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    {(() => {
                        const currentIndex = allProjects.findIndex(p => p.id === project.id);
                        const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null; // Logic reversed because of DESC order?
                        // Wait, if ordered by ID DESC: [10, 9, 8, ... 1]
                        // If current is 9 (index 1). Prev in array is 10 (index 0). Next is 8 (index 2).
                        // "Previous Project" usually means OLDER ID? Or NEWER ID?
                        // Let's assume standard intuitive flow. "Previous" -> Left Button -> Newer project? 
                        // In typical carousels, Left = Previous item in list.
                        // If list is newest first: Next Item in array = Older project.
                        // Let's stick to array index logic for consistency with list view.
                        const prevInList = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
                        const nextInList = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

                        return (
                            <>
                                <div className="w-full md:w-1/2 flex justify-start">
                                    {prevInList ? (
                                        <button
                                            onClick={() => navigate(`/project/${prevInList.id}`)}
                                            className="group flex flex-col items-start gap-1 text-left hover:opacity-70 transition-opacity"
                                        >
                                            <span className="text-xs font-bold uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                                Projet précédent
                                            </span>
                                            <span className="text-xl md:text-2xl font-black">{prevInList.title}</span>
                                        </button>
                                    ) : (
                                        <div className="flex-1"></div> // Spacer
                                    )}
                                </div>

                                <div className="w-full md:w-1/2 flex justify-end">
                                    {nextInList ? (
                                        <button
                                            onClick={() => navigate(`/project/${nextInList.id}`)}
                                            className="group flex flex-col items-end gap-1 text-right hover:opacity-70 transition-opacity"
                                        >
                                            <span className="text-xs font-bold uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                                Projet suivant
                                                <FaArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                            <span className="text-xl md:text-2xl font-black">{nextInList.title}</span>
                                        </button>
                                    ) : (
                                        <div className="flex-1"></div> // Spacer
                                    )}
                                </div>
                            </>
                        );
                    })()}
                </div>

            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={selectedImage}
                            alt="Full screen view"
                            className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default ProjectDetail;
