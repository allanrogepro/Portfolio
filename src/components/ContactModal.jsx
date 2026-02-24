import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { supabase } from '../supabaseClient';

const ContactModal = ({ isOpen, onClose }) => {
    const form = useRef();
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setSent(false);
            setError('');
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            console.log("Cleaning up modal");
        };
    }, [isOpen]);

    const sendEmail = async (e) => {
        e.preventDefault();
        setSending(true);
        setError('');

        const formData = new FormData(form.current);
        const data = {
            from_name: formData.get('from_name'),
            reply_to: formData.get('reply_to'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        const SERVICE_ID = 'service_8d64kxj';
        const TEMPLATE_ID = 'template_cchjd0i';
        const PUBLIC_KEY = 'q3Haiv59FvjH_ubXS';

        try {
            const { error: dbError } = await supabase
                .from('messages')
                .insert([
                    {
                        from_name: data.from_name,
                        email: data.reply_to,
                        subject: data.subject,
                        message: data.message,
                        read: false
                    }
                ]);

            if (dbError) console.error("Supabase Error:", dbError);

            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);

            console.log('SUCCESS!');
            setSent(true);
            e.target.reset();

            setTimeout(() => {
                onClose();
                setSent(false);
            }, 3000);

        } catch (err) {
            console.log('FAILED...', err);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-3xl p-6 md:p-10 w-full max-w-4xl shadow-2xl pointer-events-auto relative overflow-hidden flex flex-col md:flex-row gap-8 md:gap-0">

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                            >
                                <FaTimes size={20} />
                            </button>

                            <div className="flex flex-col justify-center w-full md:w-5/12 space-y-8">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-black uppercase leading-none mb-4">
                                        Contactez<br /><span className="text-portfolio-yellow">Moi.</span>
                                    </h2>
                                    <p className="text-gray-600 font-medium">
                                        Un projet en tête ou simplement envie de discuter ? N'hésitez pas !
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Réseaux Sociaux</h3>
                                    <div className="flex gap-4">
                                        <a
                                            href="https://www.linkedin.com/in/allan-roge-124747388/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-black hover:bg-[#0077b5] hover:text-white transition-all transform hover:scale-110 shadow-sm"
                                            title="LinkedIn"
                                        >
                                            <FaLinkedinIn size={20} />
                                        </a>
                                        <a
                                            href="https://www.instagram.com/allan_rge/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-black hover:bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:text-white transition-all transform hover:scale-110 shadow-sm"
                                            title="Instagram"
                                        >
                                            <FaInstagram size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block w-px bg-gray-200 mx-6"></div>

                            <div className="w-full md:w-7/12">
                                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold mb-1">Nom</label>
                                            <input
                                                type="text"
                                                name="from_name"
                                                required
                                                placeholder="Votre nom"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-portfolio-yellow focus:ring-1 focus:ring-portfolio-yellow transition-all text-sm font-medium placeholder:font-normal"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="reply_to"
                                                required
                                                placeholder="votre@email.com"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-portfolio-yellow focus:ring-1 focus:ring-portfolio-yellow transition-all text-sm font-medium placeholder:font-normal"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold mb-1">Sujet</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            placeholder="Sujet de votre message"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-portfolio-yellow focus:ring-1 focus:ring-portfolio-yellow transition-all text-sm font-medium placeholder:font-normal"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold mb-1">Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows="4"
                                            placeholder="Votre message..."
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-portfolio-yellow focus:ring-1 focus:ring-portfolio-yellow transition-all resize-none text-sm font-medium placeholder:font-normal"
                                        ></textarea>
                                    </div>

                                    <div className="text-right pt-2 flex flex-col items-end">
                                        <button
                                            type="submit"
                                            disabled={sending}
                                            className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-portfolio-yellow hover:text-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white disabled:hover:transform-none"
                                        >
                                            {sending ? 'Envoi...' : 'Envoyer'}
                                        </button>

                                        {sent && (
                                            <p className="text-green-600 text-sm font-bold mt-2">
                                                Message envoyé avec succès !
                                            </p>
                                        )}
                                        {error && (
                                            <p className="text-red-600 text-sm font-bold mt-2">
                                                {error}
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
