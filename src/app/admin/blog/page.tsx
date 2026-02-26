'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, FileText, Eye, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { deletePost, togglePostStatus, type Post } from '@/lib/actions/posts';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function BlogManagerPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPosts = async () => {
        setLoading(true);
        const supabase = createClient();
        if (!supabase) return;

        const { data, error } = await supabase
            .from('posts')
            .select('*, categoria:categorias(nombre)')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setPosts(data as any[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de que deseas eliminar este post?')) {
            const result = await deletePost(id);
            if (result.success) {
                fetchPosts();
            } else {
                alert('Error al eliminar: ' + result.error);
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const result = await togglePostStatus(id, currentStatus);
        if (result.success) {
            fetchPosts();
        } else {
            alert('Error al cambiar estado: ' + result.error);
        }
    };

    const filteredPosts = posts.filter(p =>
        p.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-serif text-brand-violet mb-2">Editor de Blog</h1>
                    <p className="text-slate-500 font-light">Escribe y gestiona los artículos de tu sitio web.</p>
                </div>
                <Link href="/admin/blog/nuevo">
                    <Button className="bg-brand-violet text-white flex items-center gap-2 px-6 py-4 rounded-2xl shadow-xl shadow-brand-violet/20 hover:bg-brand-green hover:text-brand-violet transition-all">
                        <Plus className="w-5 h-5" /> Nuevo Artículo
                    </Button>
                </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-brand-violet/5 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar artículos por título..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-20 text-center">
                        <div className="w-12 h-12 border-4 border-brand-violet border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-400 italic">Cargando artículos...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 text-left">
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Artículo</th>
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Categoría</th>
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Vistas</th>
                                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredPosts.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-12 text-center text-slate-400 italic">
                                            No se encontraron artículos.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPosts.map((post) => (
                                        <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                                                        <img
                                                            src={post.imagen_banner_url || 'https://via.placeholder.com/150'}
                                                            alt={post.titulo}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-brand-violet line-clamp-1">{post.titulo}</p>
                                                        <p className="text-xs text-slate-400">Actualizado {new Date(post.updated_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="px-3 py-1 bg-brand-green/10 text-brand-violet rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    {post.categoria?.nombre || 'Sin Categoría'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <button
                                                    onClick={() => handleToggleStatus(post.id, post.status)}
                                                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all ${post.status === 'published'
                                                            ? 'bg-brand-green/20 text-brand-green hover:bg-brand-green/30'
                                                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                                        }`}
                                                >
                                                    {post.status === 'published' ? (
                                                        <><CheckCircle className="w-3 h-3" /> Publicado</>
                                                    ) : (
                                                        <><Clock className="w-3 h-3" /> Borrador</>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                                                    <Eye className="w-4 h-4" /> {post.views || 0}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/admin/blog/${post.id}/editar`}>
                                                        <button
                                                            title="Editar artículo"
                                                            className="p-2 text-slate-400 hover:text-brand-violet hover:bg-white rounded-lg shadow-sm transition-all"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        title="Eliminar artículo"
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm transition-all"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
