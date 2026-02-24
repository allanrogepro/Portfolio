import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaEnvelope, FaChartBar, FaLayerGroup } from 'react-icons/fa';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Dashboard = () => {
    useDocumentTitle('Admin Dashboard');
    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState({ totalProjects: 0, totalMessages: 0, unreadMessages: 0 });
    const [loading, setLoading] = useState(true);
    const { signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // 1. Fetch Projects
            const { data: projectsData, error: projectsError } = await supabase
                .from('projects')
                .select('*')
                .order('id', { ascending: false });

            if (projectsError) throw projectsError;
            setProjects(projectsData || []);

            // 2. Fetch Messages Count (assuming table exists, otherwise handle gracefully)
            const { count: msgCount, error: msgError } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true });

            const { count: unreadCount } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('read', false);

            setStats({
                totalProjects: projectsData?.length || 0,
                totalMessages: msgCount || 0,
                unreadMessages: unreadCount || 0
            });

        } catch (error) {
            console.error('Error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce projet ?')) return;

        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchData(); // Refresh all
        } catch (error) {
            alert('Erreur lors de la suppression: ' + error.message);
        }
    };

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Dashboard</h1>
                        <p className="text-gray-500 font-medium">Bienvenue Allan !</p>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/admin/messages"
                            className="bg-white text-black border border-gray-200 px-6 py-3 rounded-full font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-100 transition-colors relative"
                        >
                            <FaEnvelope />
                            Messages
                            {stats.unreadMessages > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                    {stats.unreadMessages}
                                </span>
                            )}
                        </Link>
                        <Link
                            to="/admin/new"
                            className="bg-black text-white px-6 py-3 rounded-full font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-portfolio-yellow hover:text-black transition-colors"
                        >
                            <FaPlus /> Nouveau Projet
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-red-500 border border-red-100 px-4 py-3 rounded-full font-bold hover:bg-red-50 transition-colors"
                            title="Se déconnecter"
                        >
                            <FaSignOutAlt />
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                            <FaLayerGroup size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Projets</p>
                            <p className="text-3xl font-black">{stats.totalProjects}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                            <FaEnvelope size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Messages</p>
                            <p className="text-3xl font-black">{stats.totalMessages}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
                            <FaChartBar size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Catégories</p>
                            <p className="text-3xl font-black">{[...new Set(projects.map(p => p.category))].length}</p>
                        </div>
                    </div>
                </div>

                {/* Projects List */}
                <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Vos Projets</h2>
                        <span className="text-sm text-gray-400 font-medium">{projects.length} projets au total</span>
                    </div>

                    {projects.length === 0 ? (
                        <div className="p-20 text-center text-gray-400">
                            Aucun projet pour le moment.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-8 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">Image</th>
                                        <th className="px-8 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">Info Projet</th>
                                        <th className="px-8 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">Catégorie</th>
                                        <th className="px-8 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {projects.map((project) => (
                                        <tr key={project.id} className="hover:bg-gray-50/80 transition-colors group">
                                            <td className="px-8 py-4 w-32">
                                                <div className="w-20 h-14 rounded-lg overflow-hidden shadow-sm bg-gray-100">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <p className="font-bold text-lg text-gray-900">{project.title}</p>
                                                <p className="text-xs text-gray-400 font-medium mt-0.5">ID: #{project.id}</p>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase bg-gray-100 text-gray-600 border border-gray-200">
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        to={`/admin/edit/${project.id}`}
                                                        className="p-2.5 bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-black rounded-lg transition-all shadow-sm"
                                                        title="Éditer"
                                                    >
                                                        <FaEdit size={14} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="p-2.5 bg-white border border-gray-200 text-red-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-lg transition-all shadow-sm"
                                                        title="Supprimer"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
