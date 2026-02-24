import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaSave, FaImage, FaTrash, FaMagic, FaCode, FaLink, FaInfoCircle, FaTimes, FaCheck, FaCrop } from 'react-icons/fa';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/imageUtils';

const ProjectEditor = () => {
    useDocumentTitle('Admin - Édition');
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const fileInputRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [project, setProject] = useState({
        title: '',
        category: 'WEB',
        year: new Date().getFullYear().toString(),
        description: '',
        link: '',
        repo: '',
        color: 'bg-gray-100',
        image: '',
        technologies: [],
        gallery: [],
        featured: false,
        video: ''
    });

    // Tech Input State
    const [techInput, setTechInput] = useState('');

    // Crop State
    const [cropImage, setCropImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            alert('Erreur: ' + error.message);
            navigate('/admin');
        } else {
            setProject(data);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProject(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // --- TECHNOLOGIES MANAGEMENT ---
    const handleAddTech = (e) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            if (!project.technologies.includes(techInput.trim())) {
                setProject(prev => ({
                    ...prev,
                    technologies: [...prev.technologies, techInput.trim()]
                }));
            }
            setTechInput('');
        }
    };

    const removeTech = (tech) => {
        setProject(prev => ({
            ...prev,
            technologies: prev.technologies.filter(t => t !== tech)
        }));
    };

    // --- FILE UPLOAD (MAIN IMAGE) ---
    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setCropImage(reader.result));
            reader.readAsDataURL(e.target.files[0]);
            setIsCropping(true);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            setUploading(true);
            const croppedImageBlob = await getCroppedImg(
                cropImage,
                croppedAreaPixels
            );

            const fileName = `${Math.random()}.jpg`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(filePath, croppedImageBlob);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);

            setProject(prev => ({ ...prev, image: data.publicUrl }));
            setIsCropping(false);
            setCropImage(null);
        } catch (e) {
            console.error(e);
            alert('Erreur lors du recadrage/upload');
        } finally {
            setUploading(false);
        }
    }, [cropImage, croppedAreaPixels]);

    const handleCropExisting = (e) => {
        e.preventDefault();
        setCropImage(project.image);
        setIsCropping(true);
    };

    // --- GALLERY UPLOAD ---
    const handleGalleryUpload = async (e) => {
        try {
            setUploading(true);
            const files = Array.from(e.target.files);
            const newUrls = [];

            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `gallery/${Math.random()}.${fileExt}`;

                const { error } = await supabase.storage
                    .from('portfolio-images')
                    .upload(fileName, file);

                if (error) throw error;

                const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
                newUrls.push(data.publicUrl);
            }

            setProject(prev => ({
                ...prev,
                gallery: [...(prev.gallery || []), ...newUrls]
            }));

        } catch (error) {
            alert('Erreur upload galerie: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const removeGalleryImage = (index) => {
        setProject(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, i) => i !== index)
        }));
    };

    // --- SUBMIT ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from('projects')
                    .update(project)
                    .eq('id', id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([project]);
                if (error) throw error;
            }
            navigate('/admin');
        } catch (error) {
            alert('Erreur sauvegarde: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing && !project.id) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-32 font-sans relative">
            {/* Top Bar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <FaArrowLeft className="text-gray-600" />
                        </Link>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                {isEditing ? 'Édition' : 'Création'}
                            </p>
                            <h1 className="text-xl font-bold text-gray-900">
                                {isEditing ? project.title : 'Nouveau Projet'}
                            </h1>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || uploading}
                        className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide hover:bg-portfolio-yellow hover:text-black transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '...' : <><FaSave /> Enregistrer</>}
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* SECTION 1: ESSENTIALS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <div className="md:col-span-1">
                            <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                                <FaInfoCircle className="text-portfolio-yellow" />
                                L'Essentiel
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Définissez l'identité de votre projet. Ces informations seront les premières visibles.
                            </p>
                        </div>
                        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Titre du projet" name="title" value={project.title} onChange={handleChange} required placeholder="Ex: Nike Campaign" />
                                <SelectGroup label="Catégorie" name="category" value={project.category} onChange={handleChange} options={['WEB', 'COMMUNICATION']} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup label="Année" name="year" value={project.year} onChange={handleChange} placeholder="2024" />
                                <InputGroup label="Couleur de fond (Tailwind)" name="color" value={project.color} onChange={handleChange} placeholder="bg-blue-100" />
                            </div>
                            <div className="pt-2 flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    checked={project.featured}
                                    onChange={handleChange}
                                    className="w-5 h-5 accent-black cursor-pointer"
                                />
                                <label htmlFor="featured" className="font-bold text-gray-700 cursor-pointer select-none">Mettre ce projet à la une</label>
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTION 2: CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <div className="md:col-span-1">
                            <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                                <FaMagic className="text-portfolio-yellow" />
                                Le Contenu
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Racontez l'histoire du projet. Soyez concis mais impactant.
                            </p>
                        </div>
                        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Description</label>
                                <textarea
                                    name="description"
                                    value={project.description}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
                                    placeholder="Décrivez le challenge, la solution et le résultat..."
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTION 3: MEDIA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <div className="md:col-span-1">
                            <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                                <FaImage className="text-portfolio-yellow" />
                                Les Visuels
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Une image vaut mille mots. Choisissez des visuels haute qualité.
                            </p>
                        </div>
                        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 space-y-8">
                            {/* Main Image */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">Vidéo du projet (Optionnel)</label>
                                {project.video ? (
                                    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden group border border-gray-200 mb-6">
                                        <video
                                            src={project.video}
                                            className="w-full h-full object-contain"
                                            controls
                                            controlsList="nodownload"
                                            onContextMenu={(e) => e.preventDefault()}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setProject(prev => ({ ...prev, video: '' }))}
                                            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-sm z-10"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <div className="group relative w-full h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-black hover:bg-gray-100 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                                            <div className="text-center text-gray-400">
                                                <FaImage className="mx-auto text-2xl mb-2" />
                                                <p className="font-bold text-xs">Uploader une vidéo (.mp4, .webm)</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={async (e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        const file = e.target.files[0];
                                                        setUploading(true);
                                                        try {
                                                            const fileExt = file.name.split('.').pop();
                                                            const fileName = `videos/${Math.random()}.${fileExt}`;
                                                            const { error } = await supabase.storage
                                                                .from('portfolio-images') // Assuming same bucket for simplicity, or ideally 'portfolio-videos'
                                                                .upload(fileName, file);

                                                            if (error) throw error;

                                                            const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
                                                            setProject(prev => ({ ...prev, video: data.publicUrl }));
                                                        } catch (error) {
                                                            alert('Erreur upload vidéo: ' + error.message);
                                                        } finally {
                                                            setUploading(false);
                                                        }
                                                    }
                                                }}
                                                disabled={uploading}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Main Image */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">Image de couverture</label>

                                {project.image ? (
                                    <div className="relative w-full h-64 bg-gray-50 rounded-2xl overflow-hidden group border border-gray-200">
                                        <img src={project.image} alt="Cover" className="w-full h-full object-cover" />

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                                            <button
                                                type="button"
                                                onClick={handleCropExisting}
                                                className="bg-white text-black px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-wider hover:bg-portfolio-yellow transition-colors flex items-center gap-2 transform hover:scale-105"
                                            >
                                                <FaCrop /> Recadrer l'image
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="bg-black text-white border border-white/20 px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2 transform hover:scale-105"
                                            >
                                                <FaImage /> Changer l'image
                                            </button>
                                        </div>

                                        {/* Hidden Input for Change */}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={onSelectFile}
                                            disabled={uploading}
                                            className="hidden"
                                        />

                                        {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div>}
                                    </div>
                                ) : (
                                    <div className="group relative w-full h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-black hover:bg-gray-100 transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                                        <div className="text-center text-gray-400">
                                            <FaImage className="mx-auto text-4xl mb-2" />
                                            <p className="font-bold text-sm">Glisser ou cliquer pour uploader</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={onSelectFile}
                                            disabled={uploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div></div>}
                                    </div>
                                )}
                            </div>

                            {/* Gallery */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 ml-1">Galerie Photos</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {project.gallery?.map((url, i) => (
                                        <div key={i} className="relative group aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeGalleryImage(i)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-sm"
                                            >
                                                <FaTrash size={10} />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="relative aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 hover:border-black hover:bg-gray-100 transition-all flex items-center justify-center cursor-pointer">
                                        <FaPlusIcon />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleGalleryUpload}
                                            disabled={uploading}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SECTION 4: TECH & LINKS */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <div className="md:col-span-1">
                            <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
                                <FaCode className="text-portfolio-yellow" />
                                Tech & Liens
                            </h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Les coulisses techniques et les liens vers le produit fini.
                            </p>
                        </div>
                        <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputGroup icon={<FaLink />} label="Site Web (URL)" name="link" value={project.link} onChange={handleChange} placeholder="https://..." />
                                <InputGroup icon={<FaCode />} label="GitHub (Repo)" name="repo" value={project.repo} onChange={handleChange} placeholder="https://github.com/..." />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-2 block">Stack Technique</label>
                                <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 focus-within:ring-2 focus-within:ring-black/5 focus-within:border-black transition-all">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="bg-white text-black pl-3 pr-2 py-1.5 rounded-lg text-sm font-bold shadow-sm border border-gray-100 flex items-center gap-2">
                                            {tech}
                                            <button type="button" onClick={() => removeTech(tech)} className="text-gray-400 hover:text-red-500 transition-colors">×</button>
                                        </span>
                                    ))}
                                    <input
                                        value={techInput}
                                        onChange={(e) => setTechInput(e.target.value)}
                                        onKeyDown={handleAddTech}
                                        placeholder="Ajouter (Entrée)..."
                                        className="bg-transparent outline-none flex-1 min-w-[120px] text-sm font-medium placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </form>
            </div>

            {/* CROP MODAL */}
            <AnimatePresence>
                {isCropping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="font-bold text-lg">Ajuster l'image</h3>
                                <button onClick={() => { setIsCropping(false); setCropImage(null); }} className="p-2 hover:bg-gray-100 rounded-full">
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="relative flex-1 bg-gray-900">
                                <Cropper
                                    image={cropImage}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={16 / 9}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>

                            <div className="p-6 bg-white space-y-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Zoom</label>
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e) => setZoom(e.target.value)}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => { setIsCropping(false); setCropImage(null); }}
                                        className="flex-1 py-3 font-bold text-gray-500 hover:text-black transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={showCroppedImage}
                                        disabled={uploading}
                                        className="flex-1 py-3 bg-black text-white rounded-xl font-bold hover:bg-portfolio-yellow hover:text-black transition-all flex justify-center items-center gap-2"
                                    >
                                        {uploading ? 'Traitement...' : <><FaCheck /> Valider le recadrage</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- SUB-COMPONENTS for cleaner code ---

const InputGroup = ({ label, name, value, onChange, required, placeholder, icon }) => (
    <div className="space-y-2 group">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 transition-colors group-focus-within:text-black">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">{icon}</div>}
            <input
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`w-full bg-gray-50 border border-gray-200 rounded-xl py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all placeholder:text-gray-300 ${icon ? 'pl-10 pr-4' : 'px-4'}`}
            />
        </div>
    </div>
);

const SelectGroup = ({ label, name, value, onChange, options }) => (
    <div className="space-y-2">
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all appearance-none"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
            </div>
        </div>
    </div>
);

const FaPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

export default ProjectEditor;
