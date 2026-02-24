import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { FaTrash, FaCheck, FaEnvelopeOpen, FaArrowLeft, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Messages = () => {
    useDocumentTitle('Admin - Messages');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching messages:', error);
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce message ?')) return;
        const { error } = await supabase.from('messages').delete().eq('id', id);
        if (!error) fetchMessages();
    };

    const toggleRead = async (message) => {
        const { error } = await supabase
            .from('messages')
            .update({ read: !message.read })
            .eq('id', message.id);
        if (!error) fetchMessages();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/admin" className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-3xl font-black uppercase">Messagerie</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <FaEnvelopeOpen size={48} className="mb-4 opacity-50" />
                            <p className="font-bold">Aucun message pour le moment</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`p-6 transition-colors hover:bg-gray-50 flex gap-4 ${msg.read ? 'opacity-60 bg-gray-50' : 'bg-white'}`}
                                >
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg">{msg.from_name} <span className="text-gray-400 text-xs font-normal ml-2">{new Date(msg.created_at).toLocaleDateString()}</span></h3>
                                            {!msg.read && <span className="bg-portfolio-yellow text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Nouveau</span>}
                                        </div>
                                        <p className="text-sm font-bold text-gray-500 mb-1">{msg.subject}</p>
                                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                                        <a href={`mailto:${msg.email}`} className="text-xs text-blue-500 font-bold mt-2 inline-block hover:underline">{msg.email}</a>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => toggleRead(msg)}
                                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
                                            title={msg.read ? "Marquer comme non-lu" : "Marquer comme lu"}
                                        >
                                            <FaCheck />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Supprimer"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Warning about missing table if needed (Static help text) */}
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex items-start gap-3">
                    <FaExclamationCircle className="text-yellow-600 mt-1 flex-shrink-0" />
                    <p className="text-xs text-yellow-800">
                        <strong>Note développeur :</strong> Si les messages ne s'affichent pas ou ne s'enregistrent pas, assurez-vous d'avoir créé la table <code>messages</code> dans Supabase avec les colonnes : <code>id, created_at, from_name, email, subject, message, read (boolean)</code>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Messages;
