'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Search, HardDrive, ExternalLink, UploadCloud, Loader2 } from 'lucide-react';
import { getStorageFiles, deleteStorageFile } from '@/lib/actions/storage';
import { createClient } from '@/lib/supabase/client';

interface MediaFile {
    name: string;
    id: string;
    updated_at: string;
    created_at: string;
    last_accessed_at: string;
    metadata: any;
    publicUrl: string;
}

export default function MediaGallery() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [bucket, setBucket] = useState<'blog-images' | 'team-photos' | 'galeria-familias'>('blog-images');
    const [searchTerm, setSearchTerm] = useState('');
    const [uploading, setUploading] = useState(false);

    const fetchFiles = async () => {
        setLoading(true);
        const data = await getStorageFiles(bucket);
        setFiles(data as MediaFile[]);
        setLoading(false);
    };

    useEffect(() => {
        fetchFiles();
    }, [bucket]);

    const handleDelete = async (fileName: string) => {
        if (confirm(`¿Eliminar permanentemente ${fileName}?`)) {
            const result = await deleteStorageFile(bucket, fileName);
            if (result.success) {
                fetchFiles();
            } else {
                alert('Error: ' + result.error);
            }
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const supabase = createClient();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

            const { error } = await supabase.storage
                .from(bucket)
                .upload(fileName, file);

            if (error) {
                console.error(`Error al subir ${file.name}:`, error);
                alert(`Error al subir ${file.name}: ${error.message}`);
            }
        }

        setUploading(false);
        fetchFiles(); // Refrescar galería
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('URL copiada al portapapeles');
    };

    const filteredFiles = files.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-serif text-brand-violet mb-2">Galería de Medios</h1>
                    <p className="text-slate-500 font-light italic text-lg">Gestiona las imágenes utilizadas en el sitio.</p>
                </div>

                <div className="flex bg-white p-1 rounded-2xl shadow-lg border border-brand-violet/5">
                    {(['blog-images', 'team-photos', 'galeria-familias'] as const).map((b) => (
                        <button
                            key={b}
                            onClick={() => setBucket(b)}
                            className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${bucket === b
                                ? 'bg-brand-violet text-white'
                                : 'text-slate-400 hover:text-brand-violet'
                                }`}
                        >
                            {b === 'blog-images' ? 'Blog' : b === 'team-photos' ? 'Equipo' : 'Familias'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-brand-violet/5 mb-8 space-y-6">

                {/* Drag and drop upload zone */}
                <div className="relative border-2 border-dashed border-brand-violet/20 rounded-3xl p-8 text-center hover:bg-slate-50 hover:border-brand-violet/40 transition-all group overflow-hidden">
                    {uploading ? (
                        <div className="flex flex-col items-center justify-center text-brand-violet py-4">
                            <Loader2 className="w-10 h-10 animate-spin mb-4" />
                            <p className="font-bold text-sm tracking-wide">Subiendo imágenes...</p>
                        </div>
                    ) : (
                        <div className="py-2">
                            <UploadCloud className="w-12 h-12 text-slate-300 mx-auto mb-4 group-hover:text-brand-violet transition-colors" />
                            <h3 className="text-brand-violet font-serif text-xl mb-1">Subir a {bucket === 'blog-images' ? 'Blog' : bucket === 'team-photos' ? 'Equipo' : 'Familias'}</h3>
                            <p className="text-sm text-slate-500 font-light">Arrastra tus imágenes aquí o haz clic para seleccionar</p>
                            <p className="text-[10px] text-slate-400 mt-2 font-mono uppercase tracking-widest">PNG, JPG, WEBP (Max 5MB)</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        title="Seleccionar imágenes"
                    />
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar archivos por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        title="Buscar archivos"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-brand-green outline-none transition-all"
                    />
                </div>
            </div>

            {loading ? (
                <div className="p-20 text-center">
                    <div className="w-12 h-12 border-4 border-brand-violet border-t-brand-green rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 italic">Explorando archivos...</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {filteredFiles.length === 0 ? (
                        <div className="col-span-full py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                            <HardDrive className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 italic">No se encontraron archivos en este bucket.</p>
                        </div>
                    ) : (
                        filteredFiles.map((file) => (
                            <div
                                key={file.name}
                                className="group relative aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-brand-violet/5 shadow-sm hover:shadow-xl transition-all"
                            >
                                <img
                                    src={file.publicUrl}
                                    alt={file.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                <div className="absolute inset-0 bg-brand-violet/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                                    <button
                                        onClick={() => copyToClipboard(file.publicUrl)}
                                        className="w-full py-2 bg-white text-brand-violet rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-green transition-colors flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        Copiar URL
                                    </button>
                                    <div className="flex gap-2 w-full">
                                        <a
                                            href={file.publicUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Ver imagen original"
                                            className="flex-1 py-2 bg-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white/40 transition-colors shadow-sm"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(file.name)}
                                            title="Eliminar permanentemente"
                                            className="flex-1 py-2 bg-red-500/80 text-white rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="absolute bottom-2 left-0 w-full text-center text-[8px] text-white/60 truncate px-2 font-mono uppercase tracking-tighter">{file.name}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
