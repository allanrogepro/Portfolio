import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechStackMarquee from '../components/TechStackMarquee';
import ThreeDTimeline from '../components/ThreeDTimeline';
import { FaLaptopCode, FaCommentDots, FaVideo, FaPaintBrush } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';

const About = ({ onOpenContact }) => {
    const [showCV, setShowCV] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    const services = [
        { icon: FaLaptopCode, title: "Web Design", desc: "Création d'interfaces modernes et ergonomiques pour le web et les applications." },
        { icon: FaCommentDots, title: "Communication digitale", desc: "Stratégies de contenu, réseaux sociaux et campagnes de communication impactantes." },
        { icon: FaVideo, title: "Montage vidéo", desc: "Réalisation et montage de vidéos créatives pour différents supports." },
        { icon: FaPaintBrush, title: "Graphisme", desc: "Design visuel, illustrations et créations graphiques avec un sens du détail." },
    ];

    const timeline = [
        { year: "2024 - Actuel", title: "IUT de Lens", subtitle: "BUT Métiers du Multimédia et de l'Internet", isCurrent: true, link: "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-metiers-du-multimedia-et-de-l-internet-parcours-creation-numerique" },
        { year: "2022 - 2023", title: "Faculté des Sciences Jean Perrin", subtitle: "Licence Science de la Vie", link: "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/licence-mention-sciences-de-la-vie" },
        { year: "2022", title: "Lycée Voltaire", subtitle: "Baccalauréat Général - spé SVT / Physique" },
    ];

    return (
        <PageTransition
            className="pt-32 pb-20 min-h-screen bg-white"
        >
            <SEO
                title="À Propos"
                description="Qui suis-je ? Allan Rogé, étudiant passionné par le multimédia, le design et le développement web."
            />
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 md:mb-32">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-black flex items-center justify-center flex-shrink-0 shadow-2xl overflow-hidden"
                    >
                        <img src="/logonb.png" alt="Logo R" className="w-full h-full object-contain p-4" />
                    </motion.div>

                    <div className="w-full text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black mb-6">À propos de moi</h1>
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-8">
                            <p>
                                Passionné par la création visuelle et la communication, je suis actuellement étudiant en MMI à l'IUT de Lens.
                                À travers mes projets, je m'efforce de transmettre des idées fortes avec un sens du détail et une identité marquée.
                            </p>
                            <p>
                                Que ce soit en audiovisuel, en web ou en communication digitale, je cherche toujours à apprendre, expérimenter, et créer des expériences impactantes.
                            </p>
                            <p>
                                Si vous souhaitez collaborer, échanger ou en savoir plus sur mon parcours, n'hésitez pas à me contacter.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button
                                onClick={onOpenContact}
                                className="bg-black text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-portfolio-yellow hover:text-black transition-colors"
                            >
                                Me contacter
                            </button>
                            <button
                                onClick={() => setShowCV(true)}
                                className="bg-black text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-portfolio-yellow hover:text-black transition-colors"
                            >
                                Voir mon CV
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 md:mb-32">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-gray-200 transition-all group"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 transition-transform">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>

            <div className="container mx-auto px-4 max-w-4xl mt-20 md:mt-32 text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black uppercase inline-block border-b-4 border-portfolio-yellow pb-2">Mes Outils de Création</h2>
            </div>

            <TechStackMarquee />

            <div className="container mx-auto px-4 max-w-4xl mt-20 md:mt-32">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-black uppercase inline-block border-b-4 border-portfolio-yellow pb-2">Mon parcours</h2>
                </div>

                <div className="relative">
                    <ThreeDTimeline items={timeline} />
                </div>

            </div>

            <AnimatePresence>
                {showCV && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setShowCV(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full h-[85vh] flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center p-4 border-b border-gray-100">
                                <h3 className="text-xl font-bold">Mon CV</h3>
                                <button
                                    onClick={() => setShowCV(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 w-full bg-gray-50 overflow-hidden flex items-center justify-center">
                                <img
                                    src="/cv_allan_roge.png"
                                    alt="CV Allan Rogé"
                                    className="max-w-full max-h-full object-contain p-4 shadow-sm transition-transform duration-100 ease-out cursor-zoom-in"
                                    onMouseEnter={() => setIsZoomed(true)}
                                    onMouseLeave={() => setIsZoomed(false)}
                                    onMouseMove={handleMouseMove}
                                    style={{
                                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                        transform: isZoomed ? 'scale(2)' : 'scale(1)'
                                    }}
                                />
                            </div>

                            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
                                <button
                                    onClick={() => setShowCV(false)}
                                    className="px-6 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Fermer
                                </button>
                                <a
                                    href="/cv_allan_roge.png"
                                    download="CV_Allan_Roge.png"
                                    className="px-6 py-2 text-sm font-bold bg-black text-white rounded-lg hover:bg-portfolio-yellow hover:text-black transition-colors flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Télécharger
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default About;
